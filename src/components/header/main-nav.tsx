"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/types/content";

interface MainNavProps {
  links: NavLink[];
}

/** True for the link's own page and the pages under it ("/" only matches itself). */
export function isActiveLink(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function MainNav({ links }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="القائمة الرئيسية" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
              className="relative block px-3 py-2 text-sm font-bold text-ink/75 transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-gold after:opacity-0 after:transition-opacity hover:text-ink hover:after:opacity-40 aria-[current=page]:text-ink aria-[current=page]:after:opacity-100"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
