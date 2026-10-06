import type { BookingStatus } from "@/content/bookings";
import { localePath, type Locale } from "@/lib/i18n";
import type { Database } from "@/types/database";

export type NotificationType = Database["public"]["Enums"]["notification_type"];

/**
 * Where a notification leads when opened: the booking's page for the person who received it.
 * Admin-side for the doctor, account-side (in their language) for the student who owns the booking.
 */
export function notificationTarget(type: NotificationType, bookingId: string | null, recipientOwnsBooking: boolean, locale: Locale): string {
  const studentPage = (id: string) => localePath(locale, `/account/bookings/${id}`);
  if (!bookingId) return localePath(locale, "/");
  if (type === "booking_created") return `/admin/bookings/${bookingId}`;
  if (type === "booking_submitted" || type === "booking_status_changed") return studentPage(bookingId);
  return recipientOwnsBooking ? studentPage(bookingId) : `/admin/bookings/${bookingId}`;
}

export interface NotificationTextInput {
  type: NotificationType;
  bookingStatus: BookingStatus | null;
  courseTitle: string;
  studentName: string;
}

export function notificationText({ type, bookingStatus, courseTitle, studentName }: NotificationTextInput, locale: Locale): string {
  if (locale === "en") {
    switch (type) {
      case "booking_created":
        return `New booking request from ${studentName} for the ${courseTitle}.`;
      case "booking_submitted":
        return `Your booking request for the ${courseTitle} has been sent. It's awaiting the doctor's approval.`;
      case "booking_status_changed":
        if (bookingStatus === "approved") return `Your request for the ${courseTitle} is approved. Look out for a message from the doctor.`;
        if (bookingStatus === "rejected") return `Your request for the ${courseTitle} wasn't approved.`;
        return `Your request for the ${courseTitle} is back on the waiting list.`;
      case "message_received":
        return `New message about the ${courseTitle}.`;
    }
  }
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

export const notificationsCopy: Record<Locale, { title: string; signInPrompt: string; empty: string; markAllRead: string; unread: string }> = {
  ar: {
    title: "الإشعارات",
    signInPrompt: "سجّل الدخول لتصلك هنا تحديثات حجوزاتك وردود الدكتور.",
    empty: "لا توجد إشعارات بعد.",
    markAllRead: "تحديد الكل كمقروء",
    unread: "جديد",
  },
  en: {
    title: "Notifications",
    signInPrompt: "Sign in to see updates on your bookings and replies from the doctor here.",
    empty: "No notifications yet.",
    markAllRead: "Mark all as read",
    unread: "New",
  },
};
