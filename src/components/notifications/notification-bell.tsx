"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NotificationSummary } from "@/app/api/notifications/summary/route";

const POLL_INTERVAL_MS = 60_000;

function isSummary(value: unknown): value is NotificationSummary {
  return typeof value === "object" && value !== null && "unread" in value && (value.unread === null || typeof value.unread === "number");
}

/** Bell with the unread count. Hidden for signed-out visitors; refreshes on navigation, focus, and every minute. */
export function NotificationBell() {
  const pathname = usePathname();
  const [unread, setUnread] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/notifications/summary", { cache: "no-store", signal: controller.signal });
        if (!response.ok) return;
        const data: unknown = await response.json();
        if (!isSummary(data)) return;
        setUnread(data.unread);
        if (data.unread === null) clearInterval(interval);
      } catch (error) {
        if (!controller.signal.aborted) console.warn("Could not load notifications", error);
      }
    }

    function loadIfVisible() {
      if (document.visibilityState === "visible") void load();
    }

    const interval = setInterval(loadIfVisible, POLL_INTERVAL_MS);
    void load();
    window.addEventListener("focus", loadIfVisible);
    return () => {
      controller.abort();
      clearInterval(interval);
      window.removeEventListener("focus", loadIfVisible);
    };
  }, [pathname]);

  if (unread === null) return null;
  const label = unread > 0 ? `الإشعارات: ${unread} غير مقروءة` : "الإشعارات";

  return (
    <Link
      href="/account/notifications"
      aria-label={label}
      className="relative flex size-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-brand hover:text-brand"
    >
      <Bell aria-hidden="true" className="size-5" />
      {unread > 0 && (
        <span aria-hidden="true" className="absolute -top-1 -start-1 flex min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </Link>
  );
}
