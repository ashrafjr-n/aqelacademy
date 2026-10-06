import { ConversationRow } from "@/components/messages/conversation-row";
import { DoctorAvatar } from "@/components/messages/doctor-avatar";
import { instructors } from "@/content/courses";
import { messagesCopy } from "@/content/messages";
import type { MyConversation } from "@/lib/dal/messages";
import { localePath, type Locale } from "@/lib/i18n";

interface MyConversationRowProps {
  conversation: MyConversation;
  locale: Locale;
}

/** A student's conversation with the doctor about one booking. */
export function MyConversationRow({ conversation, locale }: MyConversationRowProps) {
  const { bookingId, courseTitle, lastMessage, lastFromMe, lastActivityAt, unread } = conversation;
  const copy = messagesCopy[locale];
  const preview = lastMessage === null ? copy.startChat : lastFromMe ? `${copy.you}: ${lastMessage}` : lastMessage;

  return (
    <ConversationRow
      href={localePath(locale, `/account/bookings/${bookingId}`)}
      leading={<DoctorAvatar />}
      title={instructors[locale].name}
      subtitle={courseTitle}
      preview={preview}
      time={lastActivityAt}
      unread={unread}
      locale={locale}
    />
  );
}
