import type { BookingStatus } from "@/content/bookings";
import type { Database } from "@/types/database";

export type NotificationType = Database["public"]["Enums"]["notification_type"];

/** Where a notification leads when opened. */
export const notificationTargets: Record<NotificationType, string> = {
  booking_created: "/admin/bookings",
  booking_status_changed: "/account/bookings",
  message_received: "/account/bookings",
};

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
  markAllRead: "تحديد الكل كمقروء",
  unread: "جديد",
};
