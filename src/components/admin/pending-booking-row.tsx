import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { getCourse } from "@/content/courses";
import type { AdminBooking } from "@/lib/dal/admin";
import { formatRelativeTime } from "@/lib/format";

interface PendingBookingRowProps {
  booking: AdminBooking;
}

/** A booking waiting for a decision, as a row that opens the booking. */
export function PendingBookingRow({ booking }: PendingBookingRowProps) {
  const studentName = booking.student?.full_name ?? "حساب محذوف";

  return (
    <Link
      href={`/admin/bookings/${booking.id}`}
      className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
    >
      <Avatar name={studentName} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold text-ink">{studentName}</span>
        <span className="block truncate text-sm">{getCourse(booking.course_slug)?.title ?? booking.course_slug}</span>
      </span>
      <time dateTime={booking.created_at} className="shrink-0 text-sm">
        {formatRelativeTime(booking.created_at)}
      </time>
      <ChevronLeft aria-hidden="true" className="size-5 shrink-0 text-body/50" />
    </Link>
  );
}
