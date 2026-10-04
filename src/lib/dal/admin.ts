import "server-only";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import type { BookingStatus } from "@/content/bookings";
import { requireUser, type SessionUser } from "@/lib/dal/session";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type StudentContact = Pick<ProfileRow, "full_name" | "email" | "phone" | "country">;

export type AdminBooking = Pick<BookingRow, "id" | "course_slug" | "status" | "user_note" | "created_at" | "decided_at"> & {
  student: StudentContact | null;
};

export interface AdminStudent extends StudentContact {
  id: string;
  created_at: string;
  bookingsCount: number;
}

export interface AdminCounts {
  pending: number;
  approved: number;
  rejected: number;
  students: number;
  /** Messages from students the doctor hasn't opened yet. */
  unreadMessages: number;
}

// ponytail: lists are capped instead of paginated; add pagination if the academy outgrows it.
const LIST_LIMIT = 200;

/**
 * The signed-in user's admin standing, decided by the database:
 * "admin" (admin account signed in with Google), "needs_google" (admin account, other sign-in), or "none".
 */
export type AdminStatus = "admin" | "needs_google" | "none";

export const getAdminStatus = cache(async (): Promise<AdminStatus> => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("current_user_admin_status");
  if (error) throw error;
  return data === "admin" || data === "needs_google" ? data : "none";
});

/**
 * Admin pages and actions call this first. Non-admins get a 404, so the area isn't revealed.
 * An admin account signed in without Google is sent to sign in with Google (the database
 * grants admin rights only to Google sessions anyway).
 */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser("/admin");
  const status = await getAdminStatus();
  if (status === "none") notFound();
  if (status === "needs_google") redirect("/admin-sign-in");
  return user;
}

async function countBookings(status: BookingStatus): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", status);
  if (error) throw error;
  return count ?? 0;
}

/** Cached per request: the dashboard layout (nav badges) and its pages both read it. */
export const getAdminCounts = cache(async (): Promise<AdminCounts> => {
  const user = await requireAdmin();
  const supabase = await createClient();
  const [pending, approved, rejected, students, unreadMessages] = await Promise.all([
    countBookings("pending"),
    countBookings("approved"),
    countBookings("rejected"),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    // ponytail: "not sent by me" equals "from a student" while there's a single admin; compare with booking owners if more join.
    supabase.from("messages").select("id", { count: "exact", head: true }).neq("sender_id", user.id).is("read_at", null),
  ]);
  if (students.error) throw students.error;
  if (unreadMessages.error) throw unreadMessages.error;
  return { pending, approved, rejected, students: students.count ?? 0, unreadMessages: unreadMessages.count ?? 0 };
});

/** Pending requests oldest first (a queue); decided ones newest first. */
export async function getAdminBookings(status: BookingStatus, limit = LIST_LIMIT): Promise<AdminBooking[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("id, course_slug, status, user_note, created_at, decided_at, student:profiles!bookings_user_id_fkey(full_name, email, phone, country)")
    .eq("status", status)
    .order("created_at", { ascending: status === "pending" })
    .limit(limit);
  if (error) throw error;
  return data;
}

export interface DecidedBooking {
  id: string;
  courseSlug: string;
  student: Pick<ProfileRow, "full_name" | "email"> | null;
}

/** Returns null when no row changed (e.g. the booking no longer exists). The DB stamps who decided and notifies the student in-app. */
export async function setBookingStatus(bookingId: string, status: BookingStatus): Promise<DecidedBooking | null> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId)
    .select("id, course_slug, student:profiles!bookings_user_id_fkey(full_name, email)")
    .maybeSingle();
  if (error) throw error;
  return data ? { id: data.id, courseSlug: data.course_slug, student: data.student } : null;
}

/** Keeps letters, digits and email characters only, so the term can't break the PostgREST filter syntax. */
function sanitizeSearch(term: string): string {
  return term.replace(/[^\p{L}\p{N}@.+_\- ]/gu, "").trim().slice(0, 60);
}

export async function getStudents(search: string): Promise<AdminStudent[]> {
  await requireAdmin();
  const supabase = await createClient();
  let query = supabase
    .from("profiles")
    .select("id, full_name, email, phone, country, created_at, bookings(count)")
    .order("created_at", { ascending: false })
    .limit(LIST_LIMIT);

  const term = sanitizeSearch(search);
  if (term) query = query.or(`full_name.ilike."%${term}%",email.ilike."%${term}%"`);

  const { data, error } = await query;
  if (error) throw error;
  return data.map(({ bookings, ...student }) => ({ ...student, bookingsCount: bookings[0]?.count ?? 0 }));
}
