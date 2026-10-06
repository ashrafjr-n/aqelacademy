import type { ReactNode } from "react";
import { ConversationSync } from "@/components/messages/conversation-sync";
import { MessageComposer } from "@/components/messages/message-composer";
import { MessageThread } from "@/components/messages/message-thread";
import { cardClassName } from "@/components/ui/card";
import { messagesCopy } from "@/content/messages";
import type { Conversation } from "@/lib/dal/messages";
import { defaultLocale, type Locale } from "@/lib/i18n";

/** The other side of the conversation, as shown in the chat header. */
export interface Counterpart {
  name: string;
  subtitle?: string;
  /** Avatar or photo element. */
  avatar: ReactNode;
}

interface ConversationPanelProps {
  conversation: Conversation;
  counterpart: Counterpart;
  emptyText: string;
  /** The dashboard is Arabic only, so it leaves this out. */
  locale?: Locale;
}

export function ConversationPanel({ conversation, counterpart, emptyText, locale = defaultLocale }: ConversationPanelProps) {
  const { booking, messages, canSend } = conversation;
  const threadId = `thread-${booking.id}`;
  const lastMessageId = messages.at(-1)?.id ?? null;
  const hasUnread = messages.some((message) => !message.isMine && !message.isRead);
  const copy = messagesCopy[locale];
  const closedText = booking.status === "rejected" ? copy.closedRejected : copy.waitForApproval;

  return (
    <section aria-labelledby={`${threadId}-title`} className={`${cardClassName} overflow-hidden`}>
      <header className="flex items-center gap-3 border-b border-line px-5 py-4">
        {counterpart.avatar}
        <div className="min-w-0">
          <h2 id={`${threadId}-title`} className="truncate font-bold text-ink">
            {counterpart.name}
          </h2>
          {counterpart.subtitle && <p className="truncate text-xs">{counterpart.subtitle}</p>}
        </div>
      </header>
      <MessageThread id={threadId} messages={messages} counterpartName={counterpart.name} emptyText={emptyText} locale={locale} />
      <div className="border-t border-line p-4">
        {canSend ? (
          <MessageComposer bookingId={booking.id} />
        ) : (
          <p className="rounded-xl bg-brand-soft p-3.5 text-center text-sm font-semibold text-ink">{closedText}</p>
        )}
      </div>
      <ConversationSync bookingId={booking.id} threadId={threadId} lastMessageId={lastMessageId} hasUnread={hasUnread} />
    </section>
  );
}
