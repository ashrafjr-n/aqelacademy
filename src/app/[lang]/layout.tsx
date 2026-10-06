import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { fontClassName } from "@/app/fonts";
import { LocaleProvider } from "@/components/locale-provider";
import { site } from "@/content/site";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import { baseOpenGraph } from "@/lib/metadata";
import "@/app/globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.fullName,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: { ...baseOpenGraph, title: site.fullName, description: site.description },
  twitter: { card: "summary_large_image" },
};

/** The site's root layout: Arabic at the original URLs, English under /en. Page chrome lives in the (site) and (app) groups. */
export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${fontClassName} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
