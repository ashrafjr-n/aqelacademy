import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { fontClassName } from "@/app/fonts";
import { Splash } from "@/components/layout/splash";
import { LocaleProvider } from "@/components/locale-provider";
import { site, siteText } from "@/content/site";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { baseOpenGraph } from "@/lib/metadata";
import "@/app/globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const text = siteText[locale];
  return {
    metadataBase: new URL(site.url),
    title: { default: text.fullName, template: `%s | ${text.name}` },
    description: text.description,
    openGraph: { ...baseOpenGraph(locale), title: text.fullName, description: text.description },
    twitter: { card: "summary_large_image" },
  };
}

/** The site's root layout: Arabic at the original URLs, English under /en. Page chrome lives in the (site) and (app) groups. */
export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={dirOf(locale)} suppressHydrationWarning className={`${fontClassName} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Splash />
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
