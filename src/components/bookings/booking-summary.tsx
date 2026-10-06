import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { StatusBadge } from "@/components/ui/status-badge";
import { bookingCopy, bookingStatus } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import type { MyBooking } from "@/lib/dal/bookings";
import { formatDate } from "@/lib/format";
import { getLocale } from "@/lib/locale";

interface BookingSummaryProps {
  booking: Pick<MyBooking, "course_slug" | "status" | "user_note" | "created_at">;
  /** h1 on the booking's own page, h2 in a list. */
  headingLevel?: "h1" | "h2";
}

/** A student's booking: the course, its status and their note. Sits inside a card. */
export async function BookingSummary({ booking, headingLevel = "h2" }: BookingSummaryProps) {
  const locale = await getLocale();
  const copy = bookingCopy[locale];
  const course = getCourse(booking.course_slug, locale);
  const statusInfo = bookingStatus(booking.status, locale);
  const Heading = headingLevel;

  return (
    <>
      <div className="flex items-start gap-4 p-5 sm:p-6">
        {course && (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface">
            <Image src={course.image.src} alt="" fill sizes="64px" className="object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <Heading className="font-bold leading-snug text-ink">{course?.title ?? booking.course_slug}</Heading>
            <StatusBadge tone={statusInfo.tone} label={statusInfo.label} />
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm">
            <CalendarDays aria-hidden="true" className="size-4 text-body/60" />
            {copy.requestedOn} <time dateTime={booking.created_at}>{formatDate(booking.created_at, locale)}</time>
          </p>
        </div>
      </div>

      <div className="space-y-4 border-t border-line bg-canvas/60 p-5 sm:p-6">
        <p className="text-sm leading-relaxed">{statusInfo.description}</p>
        {booking.user_note && (
          <p className="rounded-xl bg-white p-3.5 text-sm leading-relaxed">
            <span className="font-bold text-ink">{copy.yourNote}: </span>
            {booking.user_note}
          </p>
        )}
      </div>
    </>
  );
}
