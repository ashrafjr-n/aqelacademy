import "server-only";
import { getAdminStatus } from "@/lib/dal/admin";
import { getMyConversations, type MyConversation } from "@/lib/dal/messages";
import { getMyNotifications, getMyUnreadCount, type MyNotification } from "@/lib/dal/notifications";
import { getMyProfile } from "@/lib/dal/profiles";
import { getCurrentUser } from "@/lib/dal/session";

/** How many items a header panel lists before offering "see all". */
export const PANEL_SIZE = 3;

export interface PanelFeed<T> {
  unread: number;
  items: T[];
  hasMore: boolean;
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
    getMyNotifications(PANEL_SIZE + 1),
    getMyUnreadCount(),
    getMyConversations(),
  ]);

  return {
    kind: "student",
    name: profile?.full_name ?? user.email,
    email: user.email,
    notifications: {
      unread: unreadNotifications ?? 0,
      items: notifications.slice(0, PANEL_SIZE),
      hasMore: notifications.length > PANEL_SIZE,
    },
    messages: {
      unread: conversations.reduce((total, conversation) => total + conversation.unread, 0),
      items: conversations.slice(0, PANEL_SIZE),
      hasMore: conversations.length > PANEL_SIZE,
    },
  };
}
