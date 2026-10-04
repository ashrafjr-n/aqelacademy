import { MessageCircle } from "lucide-react";
import { AdminInboxRow } from "@/components/admin/admin-inbox-row";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTitle } from "@/components/ui/page-title";
import { adminCopy, adminSections } from "@/content/admin";
import { messagesCopy } from "@/content/messages";
import { getAdminInbox } from "@/lib/dal/messages";

export default async function AdminMessagesPage() {
  const inbox = await getAdminInbox();

  return (
    <>
      <PageTitle title={adminSections.messages.label} description={adminCopy.messagesDescription} />
      <Card flush>
        {inbox.length === 0 ? (
          <EmptyState icon={<MessageCircle aria-hidden="true" />} title={messagesCopy.inboxEmpty} />
        ) : (
          <ul className="divide-y divide-line">
            {inbox.map((entry) => (
              <li key={entry.bookingId}>
                <AdminInboxRow entry={entry} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
