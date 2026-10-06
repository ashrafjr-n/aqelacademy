import { Ticket } from "lucide-react";
import Link from "next/link";
import { AdminBookingCard } from "@/components/admin/admin-booking-card";
import { FormAlert } from "@/components/forms/form-alert";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTitle } from "@/components/ui/page-title";
import { adminBookingFilters, adminCopy, adminSections } from "@/content/admin";
import type { BookingStatus } from "@/content/bookings";
import { getNotice } from "@/content/notices";
import { getAdminBookings, getAdminCounts } from "@/lib/dal/admin";

function parseStatus(value: unknown): BookingStatus {
  return adminBookingFilters.find((filter) => filter.status === value)?.status ?? "pending";
}

export default async function AdminBookingsPage({ searchParams }: PageProps<"/admin/bookings">) {
  const { status, notice } = await searchParams;
  const activeStatus = parseStatus(status);
  const activeFilter = adminBookingFilters.find((filter) => filter.status === activeStatus) ?? adminBookingFilters[0];
  const noticeMessage = getNotice(notice);
  const [bookings, counts] = await Promise.all([getAdminBookings(activeStatus), getAdminCounts()]);

  return (
    <>
      <PageTitle title={adminSections.bookings.label} description={adminCopy.bookingsDescription} />
      {noticeMessage && <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />}

      <nav aria-label="تصفية الطلبات" className="flex gap-1 overflow-x-auto rounded-xl border border-line bg-white p-1.5 shadow-card">
        {adminBookingFilters.map((filter) => {
          const isActive = filter.status === activeStatus;
          return (
            <Link
              key={filter.status}
              href={`${adminSections.bookings.href}?status=${filter.status}`}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-base font-bold text-body transition-colors hover:text-ink aria-[current=page]:bg-ink aria-[current=page]:text-white"
            >
              {filter.label}
              <span className={`rounded-full px-2 text-sm tabular-nums ${isActive ? "bg-white/15" : "bg-surface"}`}>{counts[filter.status]}</span>
            </Link>
          );
        })}
      </nav>

      {bookings.length === 0 ? (
        <Card>
          <EmptyState icon={<Ticket aria-hidden="true" />} title={activeFilter.empty} />
        </Card>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <AdminBookingCard key={booking.id} booking={booking} returnTo={activeStatus} />
          ))}
        </div>
      )}
    </>
  );
}
