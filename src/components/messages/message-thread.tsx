import { CheckCheck } from "lucide-react";
import { messagesCopy } from "@/content/messages";
import type { ConversationMessage } from "@/lib/dal/messages";
import { formatRelativeTime } from "@/lib/format";

interface MessageThreadProps {
  id: string;
  messages: ConversationMessage[];
  studentName: string;
  emptyText: string;
}

/** Oldest first; the viewer's own messages sit on the start side. */
export function MessageThread({ id, messages, studentName, emptyText }: MessageThreadProps) {
  if (messages.length === 0) {
    return (
      <p id={id} className="rounded-2xl bg-surface p-6 text-center">
        {emptyText}
      </p>
    );
  }

  return (
    <ol id={id} aria-label={messagesCopy.threadTitle} className="max-h-[60vh] space-y-3 overflow-y-auto rounded-2xl bg-surface p-4">
      {messages.map((message) => {
        const sender = message.isMine ? messagesCopy.you : message.fromStudent ? studentName : messagesCopy.doctorName;
        return (
          <li key={message.id} className={`flex ${message.isMine ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.isMine ? "bg-brand-soft" : "border border-line bg-white"}`}>
              <p className="text-sm font-bold text-ink">{sender}</p>
              <p className="mt-1 whitespace-pre-wrap break-words leading-relaxed">{message.body}</p>
              <p className="mt-2 flex items-center gap-2 text-xs">
                <time dateTime={message.createdAt}>{formatRelativeTime(message.createdAt)}</time>
                {message.isMine && message.isRead && (
                  <span className="flex items-center gap-1 text-success">
                    <CheckCheck aria-hidden="true" className="size-4" />
                    {messagesCopy.read}
                  </span>
                )}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
