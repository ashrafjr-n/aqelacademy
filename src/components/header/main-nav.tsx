"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathWithoutLocale } from "@/lib/i18n";
import type { NavLink } from "@/types/content";

interface MainNavProps {
  /** Hrefs already carry the locale prefix. */
  links: NavLink[];
  label: string;
}

/**
 * True for the link's own page and the pages under it ("/" only matches itself). Both sides drop the
 * locale prefix: a prerendered Arabic page sees its internal "/ar/…" path on the server and "/…" in the browser.
 */
export function isActiveLink(pathname: string, href: string): boolean {
  const page = pathWithoutLocale(pathname);
  const target = pathWithoutLocale(href);
  return target === "/" ? page === "/" : page === target || page.startsWith(`${target}/`);
}

export function MainNav({ links, label }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center xl:gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
              className="relative block px-2 py-2 text-sm font-bold whitespace-nowrap text-ink/75 transition-colors after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:bg-gold after:opacity-0 after:transition-opacity hover:text-ink hover:after:opacity-40 aria-[current=page]:text-ink aria-[current=page]:after:opacity-100 xl:px-3 xl:after:inset-x-3"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
