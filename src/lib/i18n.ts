export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

/** Arabic keeps the original URLs; English pages live under /en. Inside the app both sit under app/[lang]. */
export const defaultLocale: Locale = "ar";

/** Set by the middleware on every page request, for Server Actions (they can't read root params). */
export const LOCALE_HEADER = "x-locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Public URL of a page in a locale: "/courses" → "/courses" (Arabic) or "/en/courses" (English). */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** The locale a public or internal pathname belongs to ("/en/…" is English, "/ar/…" and the rest Arabic). */
export function localeOfPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : defaultLocale;
}

/** Drops the locale prefix: "/en/courses", "/ar/courses" and "/courses" all give "/courses". */
export function pathWithoutLocale(pathname: string): string {
  const match = /^\/(ar|en)(?=\/|$)/.exec(pathname);
  return match ? pathname.slice(match[0].length) || "/" : pathname;
}
