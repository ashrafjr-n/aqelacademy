import type { Metadata } from "next";
import shareImage from "@/assets/images/share.jpg";
import { siteText } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";

const ogLocales: Record<Locale, string> = { ar: "ar_AR", en: "en_GB" };

/**
 * Link-preview defaults (WhatsApp, Facebook…). Next replaces `openGraph` as a whole, so a page
 * that sets its own title spreads these to keep the image and site name.
 */
export function baseOpenGraph(locale: Locale) {
  const text = siteText[locale];
  return {
    type: "website",
    locale: ogLocales[locale],
    siteName: text.name,
    images: [{ url: shareImage.src, width: shareImage.width, height: shareImage.height, alt: text.fullName }],
  } satisfies Metadata["openGraph"];
}

/** Canonical URL plus hreflang links for a public page (locale-free path), so search engines pair both languages. */
export function languageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: localePath(locale, path),
    languages: { ar: path, en: localePath("en", path), "x-default": path },
  };
}
