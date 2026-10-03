"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { NavLink } from "@/types/content";

interface MobileNavProps {
  links: NavLink[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        className="rounded-lg p-2 text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand"
      >
        {isOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>

      {isOpen && (
        <nav id="mobile-nav" aria-label="القائمة الرئيسية" className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lg">
          <ul className="container-site py-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close} className="block rounded-lg px-3 py-3 font-semibold text-ink hover:bg-surface hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
