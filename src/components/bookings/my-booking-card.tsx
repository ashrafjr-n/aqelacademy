import { CalendarDays, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookingProgress } from "@/components/bookings/booking-progress";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClassName } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { bookingCopy, bookingStatuses } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import { messagesCopy } from "@/content/messages";
import type { MyBooking } from "@/lib/dal/bookings";
import { formatDate } from "@/lib/format";

interface MyBookingCardProps {
  booking: MyBooking;
  unreadMessages: number;
}

export function MyBookingCard({ booking, unreadMessages }: MyBookingCardProps) {
  const course = getCourse(booking.course_slug);
  const statusInfo = bookingStatuses[booking.status];
  const isApproved = booking.status === "approved";

  return (
    <article className={`${cardClassName} overflow-hidden`}>
      <div className="flex items-start gap-4 p-5 sm:p-6">
        {course && (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface">
            <Image src={course.image.src} alt="" fill sizes="64px" className="object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h2 className="font-bold leading-snug text-ink">{course?.title ?? booking.course_slug}</h2>
            <StatusBadge tone={statusInfo.tone} label={statusInfo.label} />
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm">
            <CalendarDays aria-hidden="true" className="size-4 text-body/60" />
            {bookingCopy.requestedOn} <time dateTime={booking.created_at}>{formatDate(booking.created_at)}</time>
          </p>
        </div>
      </div>

      <div className="space-y-4 border-t border-line bg-canvas/60 p-5 sm:p-6">
        <BookingProgress status={booking.status} />
        <p className="text-sm leading-relaxed">{statusInfo.description}</p>
        {booking.user_note && (
          <p className="rounded-xl bg-white p-3.5 text-sm leading-relaxed">
            <span className="font-bold text-ink">{bookingCopy.yourNote}: </span>
            {booking.user_note}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-line p-4 sm:px-6">
        <ButtonLink href={`/account/bookings/${booking.id}`} variant={isApproved ? "primary" : "outline"}>
          <MessageCircle aria-hidden="true" className="size-4" />
          {isApproved ? bookingCopy.openChat : bookingCopy.openDetails}
        </ButtonLink>
        {unreadMessages > 0 && (
          <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand-dark">{messagesCopy.newMessages(unreadMessages)}</span>
        )}
        {course && (
          <Link href={`/courses/${course.slug}`} className="ms-auto text-sm font-bold text-brand hover:text-brand-dark">
            {bookingCopy.courseDetails}
          </Link>
        )}
      </div>
    </article>
  );
}
