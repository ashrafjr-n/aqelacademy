import { Plus, Ticket } from "lucide-react";
import type { Metadata } from "next";
import { MyBookingCard } from "@/components/bookings/my-booking-card";
import { FormAlert } from "@/components/forms/form-alert";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTitle } from "@/components/ui/page-title";
import { accountCopy, accountSections } from "@/content/account";
import { bookingCopy } from "@/content/bookings";
import { getNotice } from "@/content/notices";
import { getMyBookings } from "@/lib/dal/bookings";
import { getMyUnreadMessageCounts } from "@/lib/dal/messages";

export const metadata: Metadata = {
  title: accountSections.bookings.label,
  robots: { index: false },
};

export default async function MyBookingsPage({ searchParams }: PageProps<"/account/bookings">) {
  const { notice } = await searchParams;
  const noticeMessage = getNotice(notice);
  const [bookings, unreadCounts] = await Promise.all([getMyBookings(), getMyUnreadMessageCounts()]);

  return (
    <>
      <PageTitle
        title={accountSections.bookings.label}
        description={accountCopy.bookingsDescription}
        action={
          bookings.length > 0 && (
            <ButtonLink href="/courses" variant="outline">
              <Plus aria-hidden="true" className="size-4" />
              {accountCopy.bookCourse}
            </ButtonLink>
          )
        }
      />
      {noticeMessage && <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />}

      {bookings.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Ticket aria-hidden="true" />}
            title={bookingCopy.empty}
            text={bookingCopy.emptyText}
            action={<ButtonLink href="/courses">استعرض الدورات</ButtonLink>}
          />
        </Card>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <MyBookingCard key={booking.id} booking={booking} unreadMessages={unreadCounts[booking.id] ?? 0} />
          ))}
        </div>
      )}
    </>
  );
}
