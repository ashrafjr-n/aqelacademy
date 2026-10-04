import { MessageCircle } from "lucide-react";
import { ConversationSync } from "@/components/messages/conversation-sync";
import { MessageComposer } from "@/components/messages/message-composer";
import { MessageThread } from "@/components/messages/message-thread";
import { messagesCopy } from "@/content/messages";
import type { Conversation } from "@/lib/dal/messages";

interface ConversationPanelProps {
  conversation: Conversation;
  emptyText: string;
}

export function ConversationPanel({ conversation, emptyText }: ConversationPanelProps) {
  const { booking, messages, canSend } = conversation;
  const threadId = `thread-${booking.id}`;
  const lastMessageId = messages.at(-1)?.id ?? null;
  const hasUnread = messages.some((message) => !message.isMine && !message.isRead);

  return (
    <section aria-labelledby={`${threadId}-title`} className="space-y-5 rounded-3xl border border-line bg-white p-6">
      <h2 id={`${threadId}-title`} className="flex items-center gap-2 text-xl font-bold text-ink">
        <MessageCircle aria-hidden="true" className="size-6 text-brand" />
        {messagesCopy.threadTitle}
      </h2>
      <MessageThread id={threadId} messages={messages} studentName={booking.student?.full_name ?? "الطالب"} emptyText={emptyText} />
      {canSend ? (
        <MessageComposer bookingId={booking.id} />
      ) : (
        <p className="rounded-2xl bg-brand-soft p-4 text-center font-semibold text-ink">{messagesCopy.waitForApproval}</p>
      )}
      <ConversationSync bookingId={booking.id} threadId={threadId} lastMessageId={lastMessageId} hasUnread={hasUnread} />
    </section>
  );
}
