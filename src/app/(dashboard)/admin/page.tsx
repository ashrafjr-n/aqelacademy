import { BadgeCheck, CircleCheck, MessageCircle, Ticket, Users } from "lucide-react";
import Link from "next/link";
import { AdminInboxRow } from "@/components/admin/admin-inbox-row";
import { PendingBookingRow } from "@/components/admin/pending-booking-row";
import { StatCard } from "@/components/admin/stat-card";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTitle } from "@/components/ui/page-title";
import { adminCopy, adminSections } from "@/content/admin";
import { messagesCopy } from "@/content/messages";
import { getAdminBookings, getAdminCounts } from "@/lib/dal/admin";
import { getAdminInbox } from "@/lib/dal/messages";

const PREVIEW_SIZE = 5;

function SeeAllLink({ href }: { href: string }) {
  return (
    <Link href={href} className="text-sm font-bold text-brand hover:text-brand-dark">
      {adminCopy.seeAll}
    </Link>
  );
}

export default async function AdminHomePage() {
  const [counts, oldestPending, inbox] = await Promise.all([getAdminCounts(), getAdminBookings("pending", PREVIEW_SIZE), getAdminInbox()]);
  const latestConversations = inbox.slice(0, PREVIEW_SIZE);

  return (
    <>
      <PageTitle title={adminCopy.greeting} description={adminCopy.overview} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard href={adminSections.bookings.href} label={adminCopy.pendingCard} value={counts.pending} icon={Ticket} highlight={counts.pending > 0} />
        <StatCard href={adminSections.messages.href} label={adminCopy.unreadCard} value={counts.unreadMessages} icon={MessageCircle} highlight={counts.unreadMessages > 0} />
        <StatCard href={`${adminSections.bookings.href}?status=approved`} label={adminCopy.approvedCard} value={counts.approved} icon={BadgeCheck} />
        <StatCard href={adminSections.students.href} label={adminCopy.studentsCard} value={counts.students} icon={Users} />
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-2">
        <Card title={adminCopy.latestPending} action={<SeeAllLink href={adminSections.bookings.href} />} flush>
          {oldestPending.length === 0 ? (
            <EmptyState icon={<CircleCheck aria-hidden="true" />} title={adminCopy.noPending} text={adminCopy.noPendingText} />
          ) : (
            <ul className="divide-y divide-line">
              {oldestPending.map((booking) => (
                <li key={booking.id}>
                  <PendingBookingRow booking={booking} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title={adminCopy.latestMessages} action={<SeeAllLink href={adminSections.messages.href} />} flush>
          {latestConversations.length === 0 ? (
            <EmptyState icon={<MessageCircle aria-hidden="true" />} title={messagesCopy.ar.inboxEmpty} />
          ) : (
            <ul className="divide-y divide-line">
              {latestConversations.map((entry) => (
                <li key={entry.bookingId}>
                  <AdminInboxRow entry={entry} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
