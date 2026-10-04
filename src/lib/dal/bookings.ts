import "server-only";
import type { BookingFailure } from "@/content/bookings";
import { requireUser } from "@/lib/dal/session";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];

export type MyBooking = Pick<BookingRow, "id" | "course_slug" | "status" | "user_note" | "created_at">;

const myBookingColumns = "id, course_slug, status, user_note, created_at";

/** The signed-in user's bookings, newest first (RLS also limits rows to them). */
export async function getMyBookings(): Promise<MyBooking[]> {
  const user = await requireUser("/account/bookings");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(myBookingColumns)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

/** The user's pending or approved booking for a course, if any. */
export async function getMyOpenBooking(courseSlug: string): Promise<MyBooking | null> {
  const user = await requireUser(`/courses/${courseSlug}/book`);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(myBookingColumns)
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .in("status", ["pending", "approved"])
    .maybeSingle();
  if (error) throw error;
  return data;
}

export type CreateBookingResult = { ok: true; bookingId: string } | { ok: false; reason: BookingFailure };

/** New bookings always start as pending; the database enforces that and the per-user limits. */
export async function createMyBooking(courseSlug: string, note: string | null): Promise<CreateBookingResult> {
  const user = await requireUser(`/courses/${courseSlug}/book`);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .insert({ user_id: user.id, course_slug: courseSlug, user_note: note })
    .select("id")
    .single();

  if (!error) return { ok: true, bookingId: data.id };
  if (error.code === "23505") return { ok: false, reason: "duplicate" };
  if (error.code === "P0001") return { ok: false, reason: "rate_limited" };
  if (error.code === "42501" || error.code === "23503") return { ok: false, reason: "unavailable" };
  throw error;
}
