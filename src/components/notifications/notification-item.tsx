import { openNotification } from "@/app/(app)/account/notifications/actions";
import { NotificationIcon } from "@/components/notifications/notification-icon";
import { notificationsCopy } from "@/content/notifications";
import type { MyNotification } from "@/lib/dal/notifications";
import { formatRelativeTime } from "@/lib/format";

interface NotificationItemProps {
  notification: MyNotification;
}

/** Opening a notification marks it read on the server, which then picks where it leads. */
export function NotificationItem({ notification }: NotificationItemProps) {
  const { id, type, text, createdAt, isRead } = notification;

  return (
    <form action={openNotification}>
      <input type="hidden" name="notificationId" value={id} />
      <button
        type="submit"
        className={`flex w-full items-start gap-3 px-4 py-3.5 text-start transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand ${isRead ? "" : "bg-brand-soft/40"}`}
      >
        <NotificationIcon type={type} isRead={isRead} />
        <span className="min-w-0 flex-1">
          <span className={`block text-sm leading-relaxed ${isRead ? "" : "font-bold text-ink"}`}>{text}</span>
          <time dateTime={createdAt} className="mt-0.5 block text-xs">
            {formatRelativeTime(createdAt)}
          </time>
        </span>
        {!isRead && (
          <>
            <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-brand" />
            <span className="sr-only">{notificationsCopy.unread}</span>
          </>
        )}
      </button>
    </form>
  );
}
