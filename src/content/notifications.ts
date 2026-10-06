import type { BookingStatus } from "@/content/bookings";
import type { Database } from "@/types/database";

export type NotificationType = Database["public"]["Enums"]["notification_type"];

/**
 * Where a notification leads when opened: the booking's page for the person who received it.
 * Admin-side for the doctor, account-side for the student who owns the booking.
 */
export function notificationTarget(type: NotificationType, bookingId: string | null, recipientOwnsBooking: boolean): string {
  if (!bookingId) return "/";
  if (type === "booking_created") return `/admin/bookings/${bookingId}`;
  if (type === "booking_submitted" || type === "booking_status_changed") return `/account/bookings/${bookingId}`;
  return recipientOwnsBooking ? `/account/bookings/${bookingId}` : `/admin/bookings/${bookingId}`;
}

export interface NotificationTextInput {
  type: NotificationType;
  bookingStatus: BookingStatus | null;
  courseTitle: string;
  studentName: string;
}

export function notificationText({ type, bookingStatus, courseTitle, studentName }: NotificationTextInput): string {
  switch (type) {
    case "booking_created":
      return `طلب حجز جديد من ${studentName} لـ ${courseTitle}.`;
    case "booking_submitted":
      return `تم إرسال طلب حجزك لـ ${courseTitle} بنجاح. بانتظار موافقة الدكتور.`;
    case "booking_status_changed":
      if (bookingStatus === "approved") return `تمت الموافقة على طلبك لـ ${courseTitle}. انتظر رسالة من الدكتور.`;
      if (bookingStatus === "rejected") return `لم تتم الموافقة على طلبك لـ ${courseTitle}.`;
      return `أُعيد طلبك لـ ${courseTitle} إلى قائمة الانتظار.`;
    case "message_received":
      return `رسالة جديدة بخصوص ${courseTitle}.`;
  }
}

export const notificationsCopy = {
  title: "الإشعارات",
  empty: "لا توجد إشعارات بعد.",
  signInPrompt: "سجّل الدخول لتصلك هنا تحديثات حجوزاتك وردود الدكتور.",
  emptyText: "ستصلك هنا تحديثات طلباتك ورسائل الدكتور.",
  markAllRead: "تحديد الكل كمقروء",
  unread: "جديد",
};
