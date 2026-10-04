import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { MyConversationRow } from "@/components/messages/my-conversation-row";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTitle } from "@/components/ui/page-title";
import { accountCopy, accountSections } from "@/content/account";
import { messagesCopy } from "@/content/messages";
import { getMyConversations } from "@/lib/dal/messages";

export const metadata: Metadata = {
  title: accountSections.messages.label,
  robots: { index: false },
};

export default async function MyMessagesPage() {
  const conversations = await getMyConversations();

  return (
    <>
      <PageTitle title={accountSections.messages.label} description={accountCopy.messagesDescription} />
      <Card flush>
        {conversations.length === 0 ? (
          <EmptyState
            icon={<MessageCircle aria-hidden="true" />}
            title={messagesCopy.noConversations}
            text={messagesCopy.noConversationsText}
            action={
              <ButtonLink href={accountSections.bookings.href} variant="outline">
                {accountSections.bookings.label}
              </ButtonLink>
            }
          />
        ) : (
          <ul className="divide-y divide-line">
            {conversations.map((conversation) => (
              <li key={conversation.bookingId}>
                <MyConversationRow conversation={conversation} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
