import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";
import { ConversationPanel } from "@/components/messages/conversation-panel";
import { BackLink } from "@/components/ui/back-link";
import { StatusBadge } from "@/components/ui/status-badge";
import { bookingStatuses } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import { messagesCopy } from "@/content/messages";
import { getMyConversation } from "@/lib/dal/messages";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "تفاصيل الحجز",
  robots: { index: false },
};

export default async function MyBookingPage({ params }: PageProps<"/account/bookings/[id]">) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const conversation = await getMyConversation(id);
  const { booking } = conversation;
  const statusInfo = bookingStatuses[booking.status];
  const courseTitle = getCourse(booking.course_slug)?.title ?? booking.course_slug;

  return (
    <>
      <BackLink href="/account/bookings" label="كل حجوزاتي" />
      <section className="rounded-3xl border border-line bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="text-lg font-bold leading-snug text-ink">{courseTitle}</h2>
          <StatusBadge tone={statusInfo.tone} label={statusInfo.label} />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-sm">
          <CalendarDays aria-hidden="true" className="size-4 text-brand" />
          طُلب في <time dateTime={booking.created_at}>{formatDate(booking.created_at)}</time>
        </p>
        <p className="mt-4 leading-relaxed">{statusInfo.description}</p>
        {booking.user_note && (
          <p className="mt-4 rounded-2xl bg-surface p-4 text-sm leading-relaxed">
            <span className="font-bold text-ink">ملاحظتك: </span>
            {booking.user_note}
          </p>
        )}
      </section>
      <ConversationPanel conversation={conversation} emptyText={messagesCopy.empty} />
    </>
  );
}
