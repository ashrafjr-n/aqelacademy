import "server-only";
import { getAdminStatus } from "@/lib/dal/admin";
import { getMyConversations, type MyConversation } from "@/lib/dal/messages";
import { getMyNotifications, getMyUnreadCount, type MyNotification } from "@/lib/dal/notifications";
import { getMyProfile } from "@/lib/dal/profiles";
import { getCurrentUser } from "@/lib/dal/session";

/** How many recent items a header panel lists; students have no other list pages. */
export const PANEL_SIZE = 10;

export interface PanelFeed<T> {
  unread: number;
  items: T[];
}

/** Everything the header shows about the visitor: nothing for guests, a dashboard link for the doctor, panels for students. */
export type AccountSummary =
  | { kind: "guest" }
  | { kind: "admin" }
  | { kind: "student"; name: string; email: string; notifications: PanelFeed<MyNotification>; messages: PanelFeed<MyConversation> };

export async function getAccountSummary(): Promise<AccountSummary> {
  const user = await getCurrentUser();
  if (!user) return { kind: "guest" };

  // The doctor's header needs nothing else, so his minute-by-minute refresh stays one query.
  if ((await getAdminStatus()) !== "none") return { kind: "admin" };

  const [profile, notifications, unreadNotifications, conversations] = await Promise.all([
    getMyProfile(),
    getMyNotifications(PANEL_SIZE),
    getMyUnreadCount(),
    getMyConversations(),
  ]);

  return {
    kind: "student",
    name: profile?.full_name ?? user.email,
    email: user.email,
    notifications: { unread: unreadNotifications ?? 0, items: notifications },
    messages: {
      unread: conversations.reduce((total, conversation) => total + conversation.unread, 0),
      items: conversations.slice(0, PANEL_SIZE),
    },
  };
}
