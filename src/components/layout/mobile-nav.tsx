"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { isActiveLink } from "@/components/header/main-nav";
import type { NavLink } from "@/types/content";

interface MobileNavProps {
  links: NavLink[];
}

/** The main menu below `lg`, as a native popover under the header. */
export function MobileNav({ links }: MobileNavProps) {
  const pathname = usePathname();

  function closeOnLink(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof Element && event.target.closest("a")) event.currentTarget.hidePopover();
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        popoverTarget="mobile-nav"
        aria-label="القائمة"
        className="flex size-10 items-center justify-center rounded-full text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand"
      >
        <Menu aria-hidden="true" className="size-6" />
      </button>

      <nav
        id="mobile-nav"
        popover="auto"
        aria-label="القائمة الرئيسية"
        onClick={closeOnLink}
        className="fixed inset-auto inset-x-4 top-[4.5rem] m-0 w-auto rounded-xl border border-line bg-white p-2 shadow-pop opacity-0 transition-[opacity,translate,overlay,display] transition-discrete duration-150 -translate-y-1 open:translate-y-0 open:opacity-100 starting:open:-translate-y-1 starting:open:opacity-0"
      >
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
                className="block rounded-lg px-4 py-3 font-bold text-ink hover:bg-surface aria-[current=page]:bg-gold-soft"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
