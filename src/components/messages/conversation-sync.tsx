"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { markConversationReadAction } from "@/components/messages/actions";

const REFRESH_INTERVAL_MS = 15_000;

interface ConversationSyncProps {
  bookingId: string;
  threadId: string;
  lastMessageId: string | null;
  hasUnread: boolean;
}

/**
 * Keeps an open conversation current without a realtime connection: refreshes the server
 * render every 15 s while visible, marks the other side's messages read once shown, and keeps
 * the thread scrolled to the newest message.
 */
export function ConversationSync({ bookingId, threadId, lastMessageId, hasUnread }: ConversationSyncProps) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    if (hasUnread) void markConversationReadAction(bookingId);
  }, [bookingId, lastMessageId, hasUnread]);

  useEffect(() => {
    const thread = document.getElementById(threadId);
    if (thread) thread.scrollTop = thread.scrollHeight;
  }, [threadId, lastMessageId]);

  return null;
}
