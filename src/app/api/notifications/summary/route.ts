import { NextResponse } from "next/server";
import { getMyUnreadCount } from "@/lib/dal/notifications";

export interface NotificationSummary {
  /** null when nobody is signed in. */
  unread: number | null;
}

/**
 * Unread count for the header bell. Read from the client so public pages can stay
 * static (prerendered) instead of rendering the header per request.
 */
export async function GET() {
  const body: NotificationSummary = { unread: await getMyUnreadCount() };
  return NextResponse.json(body, { headers: { "Cache-Control": "private, no-store" } });
}
