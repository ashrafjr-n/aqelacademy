import { AppFooter } from "@/components/layout/app-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ButtonLink } from "@/components/ui/button-link";
import { siteText } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";

interface NotFoundViewProps {
  locale: Locale;
}

/** The 404 page for both root layouts; it renders outside the group layouts, so it brings its own header and footer. */
export function NotFoundView({ locale }: NotFoundViewProps) {
  const { chrome } = siteText[locale];

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="flex flex-1 items-center bg-canvas">
        <section className="container-site py-24 text-center">
          <p className="font-heading text-7xl font-bold text-gold">404</p>
          <h1 className="mt-4 font-heading text-2xl font-bold text-ink">{chrome.notFoundTitle}</h1>
          <p className="mt-3">{chrome.notFoundText}</p>
          <div className="mt-8">
            <ButtonLink href={localePath(locale, "/")}>{chrome.backHome}</ButtonLink>
          </div>
        </section>
      </main>
      <AppFooter locale={locale} />
    </>
  );
}
