import "server-only";
import { getCourse } from "@/content/courses";
import { notificationTargets, notificationText, type NotificationType } from "@/content/notifications";
import { getCurrentUser, requireUser } from "@/lib/dal/session";
import { createClient } from "@/lib/supabase/server";

export interface MyNotification {
  id: string;
  type: NotificationType;
  text: string;
  createdAt: string;
  isRead: boolean;
}

/** Unread count for the header bell, or null when nobody is signed in. */
export async function getMyUnreadCount(): Promise<number | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .is("read_at", null);
  if (error) throw error;
  return count ?? 0;
}

export async function getMyNotifications(limit = 50): Promise<MyNotification[]> {
  const user = await requireUser("/account/notifications");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("id, type, booking_status, read_at, created_at, booking:bookings(course_slug, student:profiles!bookings_user_id_fkey(full_name))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;

  return data.map((notification) => ({
    id: notification.id,
    type: notification.type,
    createdAt: notification.created_at,
    isRead: notification.read_at !== null,
    text: notificationText({
      type: notification.type,
      bookingStatus: notification.booking_status,
      courseTitle: getCourse(notification.booking?.course_slug ?? "")?.title ?? "دورة",
      studentName: notification.booking?.student?.full_name ?? "طالب",
    }),
  }));
}

/** Marks one of the user's notifications read and returns where it leads (never a client-supplied URL). */
export async function openMyNotification(notificationId: string): Promise<string> {
  const user = await requireUser("/account/notifications");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId)
    .eq("user_id", user.id)
    .select("type")
    .maybeSingle();
  if (error) throw error;
  return data ? notificationTargets[data.type] : "/account/notifications";
}

export async function markAllMyNotificationsRead(): Promise<void> {
  const user = await requireUser("/account/notifications");
  const supabase = await createClient();
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .is("read_at", null);
  if (error) throw error;
}
