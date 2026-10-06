"use client";

import { Bell, LogIn, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "@/app/[lang]/(app)/account/actions";
import { AccountMenu, accountTriggerClassName } from "@/components/header/account-menu";
import { GuestMenu } from "@/components/header/guest-menu";
import { MessagesMenu } from "@/components/header/messages-menu";
import { NotificationsMenu } from "@/components/header/notifications-menu";
import { DoctorAvatar } from "@/components/messages/doctor-avatar";
import { buttonClassName } from "@/components/ui/button-styles";
import { adminCopy, adminSections } from "@/content/admin";
import { messagesCopy } from "@/content/messages";
import { notificationsCopy } from "@/content/notifications";
import type { AccountSummary } from "@/lib/dal/account-summary";

const POLL_INTERVAL_MS = 60_000;

const authPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/auth/", "/admin-sign-in"];

// Survives the header remounting when navigation crosses route groups, so the buttons don't flash.
let cachedSummary: AccountSummary | null = null;

function isAccountSummary(value: unknown): value is AccountSummary {
  return typeof value === "object" && value !== null && "kind" in value && ["guest", "admin", "student"].includes(String(value.kind));
}

async function fetchSummary(signal?: AbortSignal): Promise<AccountSummary | null> {
  try {
    const response = await fetch("/api/account/summary", { cache: "no-store", signal });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return isAccountSummary(data) ? data : null;
  } catch (error) {
    if (!signal?.aborted) console.warn("Could not load the account summary", error);
    return null;
  }
}

/**
 * The header's signed-in area: notifications and messages buttons that ask guests to sign in, plus a
 * sign-in button; a dashboard link for the doctor; notifications, messages and account menus for students. Refreshes on navigation, on focus,
 * every minute while signed in, and whenever a panel opens.
 */
export function HeaderAccount() {
  const pathname = usePathname();
  const [summary, setSummary] = useState<AccountSummary | null>(cachedSummary);

  function apply(data: AccountSummary) {
    cachedSummary = data;
    setSummary(data);
  }

  useEffect(() => {
    const controller = new AbortController();
    function load() {
      return fetchSummary(controller.signal).then((data) => {
        if (!data) return;
        cachedSummary = data;
        setSummary(data);
        if (data.kind === "guest") clearInterval(interval);
      });
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

  async function refresh() {
    const data = await fetchSummary();
    if (data) apply(data);
  }

  if (!summary) return null;

  if (summary.kind === "guest") {
    // Come back here after signing in, unless "here" is a sign-in page itself.
    const isAuthPage = authPaths.some((path) => pathname.startsWith(path));
    const loginHref = isAuthPage ? "/login" : `/login?next=${encodeURIComponent(pathname)}`;
    return (
      <>
        <GuestMenu
          id="notifications-panel"
          title={notificationsCopy.title}
          icon={<Bell aria-hidden="true" className="size-5" />}
          text={notificationsCopy.signInPrompt}
          loginHref={loginHref}
        />
        <GuestMenu
          id="messages-panel"
          title={messagesCopy.inboxTitle}
          icon={<MessageCircle aria-hidden="true" className="size-5" />}
          text={messagesCopy.signInPrompt}
          loginHref={loginHref}
        />
        <Link href={loginHref} aria-label="تسجيل الدخول" className={`${buttonClassName("outline")} h-10 px-3 sm:px-4`}>
          <LogIn aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">تسجيل الدخول</span>
        </Link>
      </>
    );
  }

  // The doctor gets a straight link to his dashboard where students have "حسابي"; he signs out from there.
  if (summary.kind === "admin") {
    return (
      <Link href={adminSections.home.href} className={accountTriggerClassName}>
        <DoctorAvatar size="sm" />
        <span className="sr-only text-sm font-bold sm:not-sr-only">{adminCopy.title}</span>
      </Link>
    );
  }

  function handleSignOut() {
    apply({ kind: "guest" });
    return signOut();
  }

  return (
    <>
      <NotificationsMenu feed={summary.notifications} onRefresh={refresh} />
      <MessagesMenu feed={summary.messages} onRefresh={refresh} />
      <AccountMenu name={summary.name} email={summary.email} onSignOut={handleSignOut} />
    </>
  );
}
