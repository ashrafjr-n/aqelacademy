import { BadgeCheck, CheckCheck, MessageCircle, Ticket, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { markAllNotificationsRead, openNotification } from "@/app/account/notifications/actions";
import { SubmitButton } from "@/components/forms/submit-button";
import { notificationsCopy, type NotificationType } from "@/content/notifications";
import { getMyNotifications } from "@/lib/dal/notifications";
import { formatRelativeTime } from "@/lib/format";

export const metadata: Metadata = {
  title: notificationsCopy.title,
  robots: { index: false },
};

const typeIcons: Record<NotificationType, LucideIcon> = {
  booking_created: Ticket,
  booking_status_changed: BadgeCheck,
  message_received: MessageCircle,
};

export default async function NotificationsPage() {
  const notifications = await getMyNotifications();
  const hasUnread = notifications.some((notification) => !notification.isRead);

  if (notifications.length === 0) {
    return <p className="rounded-3xl border border-line bg-white p-10 text-center font-bold text-ink">{notificationsCopy.empty}</p>;
  }

  return (
    <>
      {hasUnread && (
        <form action={markAllNotificationsRead} className="flex justify-end">
          <SubmitButton label={notificationsCopy.markAllRead} pendingLabel="جارٍ التحديث…" variant="outline" icon={<CheckCheck aria-hidden="true" className="size-5" />} fullWidth={false} />
        </form>
      )}
      <ul className="overflow-hidden rounded-3xl border border-line bg-white">
        {notifications.map((notification) => {
          const Icon = typeIcons[notification.type];
          return (
            <li key={notification.id} className="border-b border-line last:border-b-0">
              <form action={openNotification}>
                <input type="hidden" name="notificationId" value={notification.id} />
                <button
                  type="submit"
                  className={`flex w-full items-start gap-4 p-5 text-start transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand ${notification.isRead ? "" : "bg-brand-soft/60"}`}
                >
                  <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${notification.isRead ? "bg-surface text-body" : "bg-brand text-white"}`}>
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className={`block leading-relaxed ${notification.isRead ? "" : "font-bold text-ink"}`}>{notification.text}</span>
                    <time dateTime={notification.createdAt} className="mt-1 block text-sm">
                      {formatRelativeTime(notification.createdAt)}
                    </time>
                  </span>
                  {!notification.isRead && <span className="sr-only">{notificationsCopy.unread}</span>}
                </button>
              </form>
            </li>
          );
        })}
      </ul>
    </>
  );
}
