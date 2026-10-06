import { headers } from "next/headers";
import { lang } from "next/root-params";
import { defaultLocale, isLocale, LOCALE_HEADER, type Locale } from "@/lib/i18n";

/** The page's locale, for Server Components under app/[lang]. Keeps static pages static. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}

/** The request's locale, for Server Actions and route handlers (root params aren't available there). */
export async function getRequestLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER);
  return isLocale(value) ? value : defaultLocale;
}
