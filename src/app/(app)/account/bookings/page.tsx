import { CalendarDays, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { FormAlert } from "@/components/forms/form-alert";
import { ButtonLink } from "@/components/ui/button-link";
import { StatusBadge } from "@/components/ui/status-badge";
import { getNotice } from "@/content/notices";
import { bookingCopy, bookingStatuses } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import { messagesCopy } from "@/content/messages";
import { getMyBookings } from "@/lib/dal/bookings";
import { getMyUnreadMessageCounts } from "@/lib/dal/messages";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: bookingCopy.listTitle,
  robots: { index: false },
};

export default async function MyBookingsPage({ searchParams }: PageProps<"/account/bookings">) {
  const { notice } = await searchParams;
  const noticeMessage = getNotice(notice);
  const [bookings, unreadCounts] = await Promise.all([getMyBookings(), getMyUnreadMessageCounts()]);
  const items = bookings.map((booking) => ({
    ...booking,
    courseTitle: getCourse(booking.course_slug)?.title ?? booking.course_slug,
    statusInfo: bookingStatuses[booking.status],
    unreadMessages: unreadCounts[booking.id] ?? 0,
  }));

  return (
    <>
      {noticeMessage && <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />}

      {items.length === 0 ? (
        <section className="rounded-3xl border border-line bg-white p-8 text-center">
          <p className="text-lg font-bold text-ink">{bookingCopy.empty}</p>
          <div className="mt-6">
            <ButtonLink href="/courses">استعرض الدورات</ButtonLink>
          </div>
        </section>
      ) : (
        <ul className="space-y-4">
          {items.map((booking) => (
            <li key={booking.id} className="rounded-3xl border border-line bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-lg font-bold leading-snug text-ink">{booking.courseTitle}</h2>
                <StatusBadge tone={booking.statusInfo.tone} label={booking.statusInfo.label} />
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm">
                <CalendarDays aria-hidden="true" className="size-4 text-brand" />
                طُلب في <time dateTime={booking.created_at}>{formatDate(booking.created_at)}</time>
              </p>
              <p className="mt-4 leading-relaxed">{booking.statusInfo.description}</p>
              {booking.user_note && (
                <p className="mt-4 rounded-2xl bg-surface p-4 text-sm leading-relaxed">
                  <span className="font-bold text-ink">ملاحظتك: </span>
                  {booking.user_note}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <ButtonLink href={`/account/bookings/${booking.id}`} variant="outline">
                  <MessageCircle aria-hidden="true" className="size-5" />
                  التفاصيل والمحادثة
                </ButtonLink>
                {booking.unreadMessages > 0 && (
                  <span className="rounded-full bg-brand px-3 py-1 text-sm font-bold text-white">
                    {messagesCopy.newMessages(booking.unreadMessages)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
