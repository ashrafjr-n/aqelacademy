import "server-only";
import type { BookingStatus } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import type { DecidedBooking } from "@/lib/dal/admin";
import { getMessageEmailContext } from "@/lib/dal/messages";
import { renderNotificationEmail } from "@/lib/email/notification-email";
import { sendEmail } from "@/lib/email/send-email";
import { getEnv } from "@/lib/env";

function courseTitleOf(slug: string): string {
  return getCourse(slug)?.title ?? "دورة";
}

async function send(to: string, subject: string, body: string, actionLabel: string, path: string): Promise<void> {
  const { html, text } = renderNotificationEmail({ title: subject, body, actionLabel, actionUrl: `${getEnv().SITE_URL}${path}` });
  await sendEmail({ to, subject, html, text });
}

/** New booking → the doctor's inbox (NOTIFY_EMAIL). */
export async function emailNewBooking(bookingId: string, studentName: string, courseSlug: string): Promise<void> {
  const { NOTIFY_EMAIL } = getEnv();
  if (!NOTIFY_EMAIL) return;
  await send(NOTIFY_EMAIL, "طلب حجز جديد", `${studentName} طلب حجز ${courseTitleOf(courseSlug)}.`, "فتح الطلب", `/admin/bookings/${bookingId}`);
}

/** Approved / rejected → the student. Moving a booking back to pending sends nothing. */
export async function emailBookingDecision(booking: DecidedBooking, status: BookingStatus): Promise<void> {
  if (!booking.student || status === "pending") return;
  const course = courseTitleOf(booking.courseSlug);
  const subject = status === "approved" ? "تمت الموافقة على طلبك" : "بخصوص طلب الحجز";
  const body =
    status === "approved"
      ? `تمت الموافقة على طلبك لـ ${course}. سيتواصل معك الدكتور قريبًا لترتيب التفاصيل.`
      : `نعتذر، لم تتم الموافقة على طلبك لـ ${course}. تواصل معنا إن كان لديك استفسار.`;
  await send(booking.student.email, subject, body, "عرض الطلب", `/account/bookings/${booking.id}`);
}

/**
 * New message → the other side, but only for the first unread one in a row, so a burst of
 * messages sends a single email. The body is never emailed: it stays inside the platform.
 */
export async function emailNewMessage(bookingId: string): Promise<void> {
  const context = await getMessageEmailContext(bookingId);
  if (!context || context.senderUnreadCount !== 1) return;
  const course = courseTitleOf(context.courseSlug);

  if (context.senderIsStudent) {
    const { NOTIFY_EMAIL } = getEnv();
    if (!NOTIFY_EMAIL) return;
    const studentName = context.student?.full_name ?? "طالب";
    await send(NOTIFY_EMAIL, `رسالة جديدة من ${studentName}`, `أرسل لك ${studentName} رسالة بخصوص ${course}.`, "قراءة الرسالة", `/admin/bookings/${bookingId}`);
    return;
  }

  if (!context.student) return;
  await send(context.student.email, "رسالة جديدة من الدكتور", `لديك رسالة جديدة من الدكتور بخصوص ${course}.`, "قراءة الرسالة", `/account/bookings/${bookingId}`);
}
