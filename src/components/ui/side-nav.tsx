"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export interface SideNavItem {
  href: string;
  label: string;
  /** A rendered icon element. */
  icon: ReactNode;
  /** Count shown at the end of the item; hidden at 0. */
  badge?: number;
}

/** The item owning the current page: the longest href that contains it (/account/bookings/123 → /account/bookings). */
export function useActiveHref(hrefs: string[]): string | undefined {
  const pathname = usePathname();
  return hrefs.filter((href) => pathname === href || pathname.startsWith(`${href}/`)).sort((a, b) => b.length - a.length)[0];
}

interface SideNavProps {
  items: SideNavItem[];
  label: string;
}

/** Section menu: a vertical list on large screens, a scrolling row of pills on small ones. */
export function SideNav({ items, label }: SideNavProps) {
  const activeHref = useActiveHref(items.map((item) => item.href));

  return (
    <nav aria-label={label} className="-mx-4 overflow-x-auto px-4 pb-1 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
      <ul className="flex gap-2 lg:flex-col lg:gap-1">
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              aria-current={item.href === activeHref ? "page" : undefined}
              className="flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold text-body transition-colors hover:bg-white hover:text-ink aria-[current=page]:bg-white aria-[current=page]:text-ink aria-[current=page]:shadow-card lg:px-3 [&>svg]:text-body/60 aria-[current=page]:[&>svg]:text-brand"
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge ? <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-bold text-white">{item.badge}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
