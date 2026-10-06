"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { StatusBadge } from "@/components/ui/status-badge";
import { bookingCopy, bookingStatuses, type BookingStatus } from "@/content/bookings";

interface CourseBooking {
  id: string;
  status: BookingStatus;
}

function isCourseBooking(value: unknown): value is CourseBooking {
  return typeof value === "object" && value !== null && "id" in value && "status" in value && typeof value.id === "string" && String(value.status) in bookingStatuses;
}

// Last answer per course: coming back to the page shows the booking at once instead of the "book" button.
const cachedBookings = new Map<string, CourseBooking | null>();

interface CourseBookingActionProps {
  courseSlug: string;
}

/**
 * The course card's action: the "book" button, or where the visitor's booking stands. The page stays
 * static, so the booking is read from the client after load.
 */
export function CourseBookingAction({ courseSlug }: CourseBookingActionProps) {
  const [booking, setBooking] = useState<CourseBooking | null>(cachedBookings.get(courseSlug) ?? null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/account/course-booking?course=${encodeURIComponent(courseSlug)}`, { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        const latest = typeof data === "object" && data !== null && "booking" in data && isCourseBooking(data.booking) ? data.booking : null;
        cachedBookings.set(courseSlug, latest);
        setBooking(latest);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.warn("Could not load the booking status", error);
      });
    return () => controller.abort();
  }, [courseSlug]);

  const canBook = !booking || booking.status === "rejected";

  return (
    <>
      {booking && (
        <div className="mt-5 rounded-lg border border-line bg-canvas p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold text-ink">{bookingCopy.courseStatusTitles[booking.status]}</p>
            <StatusBadge tone={bookingStatuses[booking.status].tone} label={bookingStatuses[booking.status].label} />
          </div>
          <p className="mt-2 text-sm leading-relaxed">{bookingStatuses[booking.status].description}</p>
          {booking.status === "approved" && (
            <div className="mt-4 grid">
              <ButtonLink href={`/account/bookings/${booking.id}`}>{bookingCopy.messageDoctor}</ButtonLink>
            </div>
          )}
          {booking.status === "pending" && (
            <Link href={`/account/bookings/${booking.id}`} className="mt-3 inline-block text-sm font-bold text-ink underline decoration-gold underline-offset-4 hover:text-gold-dark">
              {bookingCopy.openDetails}
            </Link>
          )}
        </div>
      )}
      {canBook && (
        <>
          <div className="mt-5 grid">
            <ButtonLink href={`/courses/${courseSlug}/book`}>{bookingCopy.bookNow}</ButtonLink>
          </div>
          <p className="mt-2.5 text-center text-xs">{bookingCopy.seatsLimited}</p>
        </>
      )}
    </>
  );
}
