import { CheckCheck, MessageCircle } from "lucide-react";
import { messagesCopy } from "@/content/messages";
import type { ConversationMessage } from "@/lib/dal/messages";
import { formatRelativeTime } from "@/lib/format";
import type { Locale } from "@/lib/i18n";

interface MessageThreadProps {
  id: string;
  messages: ConversationMessage[];
  /** Read to screen readers before the other side's messages. */
  counterpartName: string;
  emptyText: string;
  locale: Locale;
}

/** Oldest first; the viewer's own messages sit on the start side. The element with `id` is the scroll container. */
export function MessageThread({ id, messages, counterpartName, emptyText, locale }: MessageThreadProps) {
  const copy = messagesCopy[locale];

  if (messages.length === 0) {
    return (
      <div id={id} className="flex h-72 flex-col items-center justify-center gap-3 bg-canvas px-6 text-center text-sm leading-relaxed">
        <MessageCircle aria-hidden="true" className="size-8 text-body/40" />
        {emptyText}
      </div>
    );
  }

  return (
    <ol id={id} aria-label={copy.threadTitle} className="h-[min(60vh,32rem)] space-y-2.5 overflow-y-auto bg-canvas px-4 py-5 sm:px-6">
      {messages.map((message) => (
        <li key={message.id} className={`flex ${message.isMine ? "justify-start" : "justify-end"}`}>
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm sm:max-w-[75%] ${message.isMine ? "rounded-ss-md bg-brand text-white" : "rounded-se-md bg-white text-ink"}`}
          >
            <p className="sr-only">{message.isMine ? copy.you : counterpartName}:</p>
            <p className="whitespace-pre-wrap break-words leading-relaxed">{message.body}</p>
            <p className={`mt-1 flex items-center justify-end gap-1.5 text-xs ${message.isMine ? "text-white/90" : "text-body"}`}>
              <time dateTime={message.createdAt}>{formatRelativeTime(message.createdAt, locale)}</time>
              {message.isMine && message.isRead && (
                <span className="flex items-center gap-1">
                  <CheckCheck aria-hidden="true" className="size-3.5" />
                  {copy.read}
                </span>
              )}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
