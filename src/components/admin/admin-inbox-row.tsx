import { ConversationRow } from "@/components/messages/conversation-row";
import { Avatar } from "@/components/ui/avatar";
import { getCourse } from "@/content/courses";
import { messagesCopy } from "@/content/messages";
import type { InboxEntry } from "@/lib/dal/messages";

interface AdminInboxRowProps {
  entry: InboxEntry;
}

/** One conversation in the doctor's inbox. */
export function AdminInboxRow({ entry }: AdminInboxRowProps) {
  return (
    <ConversationRow
      href={`/admin/bookings/${entry.bookingId}`}
      leading={<Avatar name={entry.studentName} />}
      title={entry.studentName}
      subtitle={getCourse(entry.courseSlug)?.title ?? entry.courseSlug}
      preview={entry.lastFromStudent ? entry.lastMessage : `${messagesCopy.ar.you}: ${entry.lastMessage}`}
      time={entry.lastMessageAt}
      unread={entry.unreadFromStudent}
    />
  );
}
