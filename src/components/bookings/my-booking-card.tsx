import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { BookingSummary } from "@/components/bookings/booking-summary";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClassName } from "@/components/ui/card";
import { bookingCopy } from "@/content/bookings";
import { messagesCopy } from "@/content/messages";
import type { MyBooking } from "@/lib/dal/bookings";

interface MyBookingCardProps {
  booking: MyBooking;
  unreadMessages: number;
}

export function MyBookingCard({ booking, unreadMessages }: MyBookingCardProps) {
  const isApproved = booking.status === "approved";

  return (
    <article className={`${cardClassName} overflow-hidden`}>
      <BookingSummary booking={booking} />
      <div className="flex flex-wrap items-center gap-3 border-t border-line p-4 sm:px-6">
        <ButtonLink href={`/account/bookings/${booking.id}`} variant={isApproved ? "primary" : "outline"}>
          <MessageCircle aria-hidden="true" className="size-4" />
          {isApproved ? bookingCopy.openChat : bookingCopy.openDetails}
        </ButtonLink>
        {unreadMessages > 0 && (
          <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand-dark">{messagesCopy.newMessages(unreadMessages)}</span>
        )}
        <Link href={`/courses/${booking.course_slug}`} className="ms-auto text-sm font-bold text-brand hover:text-brand-dark">
          {bookingCopy.courseDetails}
        </Link>
      </div>
    </article>
  );
}
