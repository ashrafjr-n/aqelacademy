"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/types/content";

interface TabNavProps {
  tabs: NavLink[];
  label: string;
}

/** Pill-style section tabs; the tab matching the current path is marked as the current page. */
export function TabNav({ tabs, label }: TabNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="flex gap-2 rounded-full bg-surface p-1.5">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 rounded-full px-4 py-2.5 text-center text-sm font-bold transition-colors ${isActive ? "bg-white text-ink shadow-sm" : "text-body hover:text-brand"}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
