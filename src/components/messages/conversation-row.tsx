import Link from "next/link";
import type { ReactNode } from "react";
import { messagesCopy } from "@/content/messages";
import { formatRelativeTime } from "@/lib/format";

interface ConversationRowProps {
  href: string;
  /** Avatar or photo element. */
  leading: ReactNode;
  title: string;
  subtitle?: string;
  preview: string;
  time: string;
  unread: number;
}

/** One conversation in a list: who, about what, the latest line, and the unread count. */
export function ConversationRow({ href, leading, title, subtitle, preview, time, unread }: ConversationRowProps) {
  const hasUnread = unread > 0;

  return (
    <Link
      href={href}
      className={`flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand ${hasUnread ? "bg-brand-soft/40" : ""}`}
    >
      {leading}
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className={`truncate text-ink ${hasUnread ? "font-bold" : "font-semibold"}`}>{title}</span>
          <time dateTime={time} className="shrink-0 text-xs">
            {formatRelativeTime(time)}
          </time>
        </span>
        {subtitle && <span className="block truncate text-xs">{subtitle}</span>}
        <span className="mt-1 flex items-center gap-2">
          <span className={`min-w-0 flex-1 truncate text-sm ${hasUnread ? "font-semibold text-ink" : ""}`}>{preview}</span>
          {hasUnread && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-bold text-white">
              {unread}
              <span className="sr-only"> {messagesCopy.newMessages(unread)}</span>
            </span>
          )}
        </span>
      </span>
    </Link>
  );
}
