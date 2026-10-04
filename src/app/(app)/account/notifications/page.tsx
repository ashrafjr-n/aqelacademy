import { Bell, CheckCheck } from "lucide-react";
import type { Metadata } from "next";
import { markAllNotificationsRead } from "@/app/(app)/account/notifications/actions";
import { SubmitButton } from "@/components/forms/submit-button";
import { NotificationItem } from "@/components/notifications/notification-item";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTitle } from "@/components/ui/page-title";
import { accountCopy, accountSections } from "@/content/account";
import { notificationsCopy } from "@/content/notifications";
import { getMyNotifications } from "@/lib/dal/notifications";

export const metadata: Metadata = {
  title: notificationsCopy.title,
  robots: { index: false },
};

export default async function NotificationsPage() {
  const notifications = await getMyNotifications();
  const hasUnread = notifications.some((notification) => !notification.isRead);

  return (
    <>
      <PageTitle
        title={accountSections.notifications.label}
        description={accountCopy.notificationsDescription}
        action={
          hasUnread && (
            <form action={markAllNotificationsRead}>
              <SubmitButton
                label={notificationsCopy.markAllRead}
                pendingLabel="جارٍ التحديث…"
                variant="outline"
                icon={<CheckCheck aria-hidden="true" className="size-4" />}
                fullWidth={false}
              />
            </form>
          )
        }
      />
      <Card flush>
        {notifications.length === 0 ? (
          <EmptyState icon={<Bell aria-hidden="true" />} title={notificationsCopy.empty} text={notificationsCopy.emptyText} />
        ) : (
          <ul className="divide-y divide-line">
            {notifications.map((notification) => (
              <li key={notification.id}>
                <NotificationItem notification={notification} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
