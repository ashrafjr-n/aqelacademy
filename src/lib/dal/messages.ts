import "server-only";
import { notFound } from "next/navigation";
import { getCourse } from "@/content/courses";
import type { Locale } from "@/lib/i18n";
import type { MessageFailure } from "@/content/messages";
import { requireAdmin, type StudentContact } from "@/lib/dal/admin";
import { requireUser, type SessionUser } from "@/lib/dal/session";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];

export type ConversationBooking = Pick<BookingRow, "id" | "course_slug" | "status" | "user_id" | "user_note" | "created_at" | "decided_at"> & {
  student: StudentContact | null;
};

export interface ConversationMessage {
  id: string;
  body: string;
  createdAt: string;
  isMine: boolean;
  isRead: boolean;
  fromStudent: boolean;
}

export interface Conversation {
  booking: ConversationBooking;
  messages: ConversationMessage[];
  canSend: boolean;
}

export interface InboxEntry {
  bookingId: string;
  courseSlug: string;
  studentName: string;
  lastMessage: string;
  lastMessageAt: string;
  lastFromStudent: boolean;
  unreadFromStudent: number;
}

/** A student's conversation with the doctor: one per booking that has messages or is approved. */
export interface MyConversation {
  bookingId: string;
  courseTitle: string;
  /** null until the first message. */
  lastMessage: string | null;
  lastFromMe: boolean;
  /** The last message's time, or when the booking was decided. */
  lastActivityAt: string;
  unread: number;
}

// ponytail: threads and the inbox read the latest 500 messages; paginate if conversations get long.
const MESSAGE_LIMIT = 500;

async function loadConversation(bookingId: string, user: SessionUser, viewer: "student" | "admin"): Promise<Conversation> {
  const supabase = await createClient();
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("id, course_slug, status, user_id, user_note, created_at, decided_at, student:profiles!bookings_user_id_fkey(full_name, email, phone, country)")
    .eq("id", bookingId)
    .maybeSingle();
  if (bookingError) throw bookingError;
  // RLS already hides other people's bookings; the owner check keeps admins on their own pages.
  if (!booking || (viewer === "student" && booking.user_id !== user.id)) notFound();

  const { data: rows, error } = await supabase
    .from("messages")
    .select("id, sender_id, body, read_at, created_at")
    .eq("booking_id", bookingId)
    .order("created_at", { ascending: true })
    .limit(MESSAGE_LIMIT);
  if (error) throw error;

  return {
    booking,
    messages: rows.map((row) => ({
      id: row.id,
      body: row.body,
      createdAt: row.created_at,
      isMine: row.sender_id === user.id,
      isRead: row.read_at !== null,
      fromStudent: row.sender_id === booking.user_id,
    })),
    canSend: viewer === "admin" || booking.status === "approved",
  };
}

export async function getMyConversation(bookingId: string): Promise<Conversation> {
  const user = await requireUser(`/account/bookings/${bookingId}`);
  return loadConversation(bookingId, user, "student");
}

export async function getAdminConversation(bookingId: string): Promise<Conversation> {
  const user = await requireAdmin();
  return loadConversation(bookingId, user, "admin");
}

export type SendMessageResult = { ok: true } | { ok: false; reason: MessageFailure };

/** The database decides who may write (owner of an approved booking, or an admin) and rate-limits. */
export async function sendMessage(bookingId: string, body: string): Promise<SendMessageResult> {
  const user = await requireUser("/account");
  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({ booking_id: bookingId, sender_id: user.id, body });

  if (!error) return { ok: true };
  if (error.code === "42501" || error.code === "23503") return { ok: false, reason: "not_allowed" };
  if (error.code === "P0001") return { ok: false, reason: "rate_limited" };
  if (error.code === "23514") return { ok: false, reason: "invalid" };
  throw error;
}

/** Marks the other side's messages in this booking, and their notifications, as read. */
export async function markConversationRead(bookingId: string): Promise<void> {
  const user = await requireUser("/account");
  const supabase = await createClient();
  const readAt = new Date().toISOString();
  const [messages, notifications] = await Promise.all([
    supabase.from("messages").update({ read_at: readAt }).eq("booking_id", bookingId).neq("sender_id", user.id).is("read_at", null),
    supabase
      .from("notifications")
      .update({ read_at: readAt })
      .eq("user_id", user.id)
      .eq("booking_id", bookingId)
      .eq("type", "message_received")
      .is("read_at", null),
  ]);
  if (messages.error) throw messages.error;
  if (notifications.error) throw notifications.error;
}

/** The signed-in student's conversations, newest activity first. */
export async function getMyConversations(locale: Locale): Promise<MyConversation[]> {
  const user = await requireUser("/");
  const supabase = await createClient();
  const [bookings, messages] = await Promise.all([
    supabase.from("bookings").select("id, course_slug, status, created_at, decided_at").eq("user_id", user.id),
    supabase
      .from("messages")
      .select("booking_id, sender_id, body, read_at, created_at")
      .order("created_at", { ascending: false })
      .limit(MESSAGE_LIMIT),
  ]);
  if (bookings.error) throw bookings.error;
  if (messages.error) throw messages.error;

  const conversations: MyConversation[] = [];
  for (const booking of bookings.data) {
    const thread = messages.data.filter((message) => message.booking_id === booking.id);
    if (thread.length === 0 && booking.status !== "approved") continue;
    const last = thread[0];
    conversations.push({
      bookingId: booking.id,
      courseTitle: getCourse(booking.course_slug, locale)?.title ?? booking.course_slug,
      lastMessage: last?.body ?? null,
      lastFromMe: last?.sender_id === user.id,
      lastActivityAt: last?.created_at ?? booking.decided_at ?? booking.created_at,
      unread: thread.filter((message) => message.sender_id !== user.id && message.read_at === null).length,
    });
  }
  return conversations.sort((a, b) => b.lastActivityAt.localeCompare(a.lastActivityAt));
}

/** One entry per conversation, newest activity first, for the doctor's inbox. */
export async function getAdminInbox(): Promise<InboxEntry[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("booking_id, sender_id, body, read_at, created_at, booking:bookings(course_slug, user_id, student:profiles!bookings_user_id_fkey(full_name))")
    .order("created_at", { ascending: false })
    .limit(MESSAGE_LIMIT);
  if (error) throw error;

  const entries = new Map<string, InboxEntry>();
  for (const message of data) {
    const fromStudent = message.sender_id !== null && message.sender_id === message.booking?.user_id;
    const entry = entries.get(message.booking_id) ?? {
      bookingId: message.booking_id,
      courseSlug: message.booking?.course_slug ?? "",
      studentName: message.booking?.student?.full_name ?? "حساب محذوف",
      lastMessage: message.body,
      lastMessageAt: message.created_at,
      lastFromStudent: fromStudent,
      unreadFromStudent: 0,
    };
    if (fromStudent && message.read_at === null) entry.unreadFromStudent += 1;
    entries.set(message.booking_id, entry);
  }
  return [...entries.values()];
}

export interface MessageEmailContext {
  courseSlug: string;
  student: StudentContact | null;
  /** True when the sender is the student who owns the booking (so the doctor should hear about it). */
  senderIsStudent: boolean;
  /** The sender's messages in this booking that the other side hasn't read yet, including the new one. */
  senderUnreadCount: number;
}

/** What the "new message" email needs, read with the sender's own permissions. */
export async function getMessageEmailContext(bookingId: string): Promise<MessageEmailContext | null> {
  const user = await requireUser("/account");
  const supabase = await createClient();
  const [booking, unread] = await Promise.all([
    supabase
      .from("bookings")
      .select("user_id, course_slug, student:profiles!bookings_user_id_fkey(full_name, email, phone, country)")
      .eq("id", bookingId)
      .maybeSingle(),
    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("booking_id", bookingId)
      .eq("sender_id", user.id)
      .is("read_at", null),
  ]);
  if (booking.error) throw booking.error;
  if (unread.error) throw unread.error;
  if (!booking.data) return null;

  return {
    courseSlug: booking.data.course_slug,
    student: booking.data.student,
    senderIsStudent: booking.data.user_id === user.id,
    senderUnreadCount: unread.count ?? 0,
  };
}
