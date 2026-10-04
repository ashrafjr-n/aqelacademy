import { ConversationRow } from "@/components/messages/conversation-row";
import { DoctorAvatar } from "@/components/messages/doctor-avatar";
import { drMuaffaq } from "@/content/courses";
import { messagesCopy } from "@/content/messages";
import type { MyConversation } from "@/lib/dal/messages";

interface MyConversationRowProps {
  conversation: MyConversation;
}

/** A student's conversation with the doctor about one booking. */
export function MyConversationRow({ conversation }: MyConversationRowProps) {
  const { bookingId, courseTitle, lastMessage, lastFromMe, lastActivityAt, unread } = conversation;
  const preview = lastMessage === null ? messagesCopy.startChat : lastFromMe ? `${messagesCopy.you}: ${lastMessage}` : lastMessage;

  return (
    <ConversationRow
      href={`/account/bookings/${bookingId}`}
      leading={<DoctorAvatar />}
      title={drMuaffaq.name}
      subtitle={courseTitle}
      preview={preview}
      time={lastActivityAt}
      unread={unread}
    />
  );
}
