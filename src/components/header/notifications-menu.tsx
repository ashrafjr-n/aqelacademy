"use client";

import { Bell } from "lucide-react";
import { useTransition } from "react";
import { markAllNotificationsRead } from "@/app/(app)/account/notifications/actions";
import { HeaderPopover, PanelFooterLink, PanelHeader } from "@/components/header/header-popover";
import { NotificationItem } from "@/components/notifications/notification-item";
import { notificationsCopy } from "@/content/notifications";
import type { PanelFeed } from "@/lib/dal/account-summary";
import type { MyNotification } from "@/lib/dal/notifications";

interface NotificationsMenuProps {
  feed: PanelFeed<MyNotification>;
  /** Reloads the feed (on open, and after marking everything read). */
  onRefresh: () => Promise<unknown>;
}

export function NotificationsMenu({ feed, onRefresh }: NotificationsMenuProps) {
  const [isPending, startTransition] = useTransition();

  function markAllRead() {
    startTransition(async () => {
      await markAllNotificationsRead();
      await onRefresh();
    });
  }

  return (
    <HeaderPopover
      id="notifications-panel"
      label={notificationsCopy.title}
      badge={feed.unread}
      trigger={<Bell aria-hidden="true" className="size-5" />}
      onOpen={() => void onRefresh()}
    >
      <PanelHeader
        title={notificationsCopy.title}
        action={
          feed.unread > 0 && (
            <button type="button" onClick={markAllRead} disabled={isPending} className="text-xs font-bold text-brand hover:text-brand-dark disabled:opacity-60">
              {notificationsCopy.markAllRead}
            </button>
          )
        }
      />
      {feed.items.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm">{notificationsCopy.empty}</p>
      ) : (
        <ul className="divide-y divide-line">
          {feed.items.map((notification) => (
            <li key={notification.id}>
              <NotificationItem notification={notification} />
            </li>
          ))}
        </ul>
      )}
      {feed.hasMore && <PanelFooterLink href="/account/notifications">{notificationsCopy.seeAll}</PanelFooterLink>}
    </HeaderPopover>
  );
}
