import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getCourse } from "@/content/courses";
import { messagesCopy } from "@/content/messages";
import { getAdminInbox } from "@/lib/dal/messages";
import { formatRelativeTime } from "@/lib/format";

export default async function AdminMessagesPage() {
  const inbox = await getAdminInbox();
  const entries = inbox.map((entry) => ({
    ...entry,
    courseTitle: getCourse(entry.courseSlug)?.title ?? entry.courseSlug,
  }));

  if (entries.length === 0) {
    return <p className="rounded-3xl border border-line bg-white p-10 text-center font-bold text-ink">{messagesCopy.inboxEmpty}</p>;
  }

  return (
    <ul className="overflow-hidden rounded-3xl border border-line bg-white">
      {entries.map((entry) => (
        <li key={entry.bookingId} className="border-b border-line last:border-b-0">
          <Link
            href={`/admin/bookings/${entry.bookingId}`}
            className={`flex items-center gap-4 p-5 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand ${entry.unreadFromStudent > 0 ? "bg-brand-soft/60" : ""}`}
          >
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-bold text-ink">{entry.studentName}</span>
                {entry.unreadFromStudent > 0 && (
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-sm font-bold text-white">
                    {messagesCopy.newMessages(entry.unreadFromStudent)}
                  </span>
                )}
              </span>
              <span className="mt-1 block text-base">{entry.courseTitle}</span>
              <span className="mt-2 block truncate">{entry.lastMessage}</span>
              <time dateTime={entry.lastMessageAt} className="mt-1 block text-sm">
                {formatRelativeTime(entry.lastMessageAt)}
              </time>
            </span>
            <ChevronLeft aria-hidden="true" className="size-6 shrink-0 text-body" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
