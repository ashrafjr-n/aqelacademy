import Link from "next/link";
import { AdminBookingCard } from "@/components/admin/admin-booking-card";
import { FormAlert } from "@/components/forms/form-alert";
import { adminBookingFilters } from "@/content/admin";
import type { BookingStatus } from "@/content/bookings";
import { getNotice } from "@/content/notices";
import { getAdminBookings } from "@/lib/dal/admin";

function parseStatus(value: unknown): BookingStatus {
  return adminBookingFilters.find((filter) => filter.status === value)?.status ?? "pending";
}

export default async function AdminBookingsPage({ searchParams }: PageProps<"/admin/bookings">) {
  const { status, notice } = await searchParams;
  const activeStatus = parseStatus(status);
  const activeFilter = adminBookingFilters.find((filter) => filter.status === activeStatus) ?? adminBookingFilters[0];
  const noticeMessage = getNotice(notice);
  const bookings = await getAdminBookings(activeStatus);

  return (
    <>
      {noticeMessage && <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />}

      <nav aria-label="تصفية الطلبات" className="flex flex-wrap gap-2">
        {adminBookingFilters.map((filter) => {
          const isActive = filter.status === activeStatus;
          return (
            <Link
              key={filter.status}
              href={`/admin/bookings?status=${filter.status}`}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full border px-5 py-2.5 text-base font-bold transition-colors ${isActive ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-brand hover:text-brand"}`}
            >
              {filter.label}
            </Link>
          );
        })}
      </nav>

      {bookings.length === 0 ? (
        <p className="rounded-3xl border border-line bg-white p-10 text-center font-bold text-ink">{activeFilter.empty}</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <AdminBookingCard key={booking.id} booking={booking} returnTo={activeStatus} />
          ))}
        </div>
      )}
    </>
  );
}
