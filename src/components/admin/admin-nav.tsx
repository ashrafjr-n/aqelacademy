"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export interface AdminNavItem {
  href: string;
  label: string;
  /** A rendered icon element. */
  icon: ReactNode;
  /** Count shown at the end of the item; hidden at 0. */
  badge?: number;
}

/** The item owning the current page: the longest href that contains it (/admin/bookings/123 → /admin/bookings). */
function useActiveHref(hrefs: string[]): string | undefined {
  const pathname = usePathname();
  return hrefs.filter((href) => pathname === href || pathname.startsWith(`${href}/`)).sort((a, b) => b.length - a.length)[0];
}

interface AdminNavProps {
  items: AdminNavItem[];
  label: string;
}

function Badge({ count }: { count: number }) {
  return (
    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-bold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

/** The dashboard sections as a sidebar list (large screens). Big targets: the doctor uses it. */
export function AdminSidebarNav({ items, label }: AdminNavProps) {
  const activeHref = useActiveHref(items.map((item) => item.href));

  return (
    <nav aria-label={label}>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.href === activeHref ? "page" : undefined}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-body transition-colors hover:bg-surface hover:text-ink aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-dark [&>svg]:size-6 [&>svg]:text-body/60 aria-[current=page]:[&>svg]:text-brand"
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge ? <Badge count={item.badge} /> : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** The same sections as a bottom tab bar (small screens), always within thumb reach. */
export function AdminTabBar({ items, label }: AdminNavProps) {
  const activeHref = useActiveHref(items.map((item) => item.href));

  return (
    <nav aria-label={label} className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <ul className="grid grid-cols-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.href === activeHref ? "page" : undefined}
              className="relative flex flex-col items-center gap-1 px-1 pt-2.5 pb-2 text-sm font-bold text-body aria-[current=page]:text-brand-dark [&>svg]:size-6 [&>svg]:text-body/60 aria-[current=page]:[&>svg]:text-brand"
            >
              {item.icon}
              {item.label}
              {item.badge ? (
                <span className="absolute top-1 start-1/2 ms-2">
                  <Badge count={item.badge} />
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
