import { BellRing, CircleCheck, Users } from "lucide-react";
import { AdminBookingCard } from "@/components/admin/admin-booking-card";
import { StatCard } from "@/components/admin/stat-card";
import { ButtonLink } from "@/components/ui/button-link";
import { adminCopy } from "@/content/admin";
import { getAdminBookings, getAdminCounts } from "@/lib/dal/admin";

export default async function AdminHomePage() {
  const [counts, oldestPending] = await Promise.all([getAdminCounts(), getAdminBookings("pending", 3)]);

  return (
    <>
      <h2 className="text-2xl font-extrabold text-ink">{adminCopy.greeting}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard href="/admin/bookings" label={adminCopy.pendingCard} value={counts.pending} icon={BellRing} highlight={counts.pending > 0} />
        <StatCard href="/admin/students" label={adminCopy.studentsCard} value={counts.students} icon={Users} />
        <StatCard href="/admin/bookings?status=approved" label={adminCopy.approvedCard} value={counts.approved} icon={CircleCheck} />
      </div>

      {oldestPending.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-ink">{adminCopy.latestPending}</h2>
          {oldestPending.map((booking) => (
            <AdminBookingCard key={booking.id} booking={booking} returnTo="pending" />
          ))}
          {counts.pending > oldestPending.length && (
            <div className="text-center">
              <ButtonLink href="/admin/bookings" variant="outline">
                {adminCopy.allPending} ({counts.pending})
              </ButtonLink>
            </div>
          )}
        </section>
      )}
    </>
  );
}
