"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { localePath, pathWithoutLocale, type Locale } from "@/lib/i18n";

interface LanguageSwitchProps {
  /** The page's current locale; the link leads to the other one. */
  locale: Locale;
  /** The other language's name, written in that language. */
  label: string;
}

/**
 * The same page in the other language. A plain link (full page load) on purpose: the root layout's
 * lang and dir change, and search engines can follow it.
 */
export function LanguageSwitch({ locale, label }: LanguageSwitchProps) {
  const pathname = usePathname();
  const target: Locale = locale === "ar" ? "en" : "ar";
  const href = localePath(target, pathWithoutLocale(pathname));

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      className="flex h-10 items-center gap-2 rounded-full px-2.5 text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand sm:px-3"
    >
      <Languages aria-hidden="true" className="size-5" />
      <span className="hidden text-sm font-bold sm:inline">{label}</span>
    </a>
  );
}
