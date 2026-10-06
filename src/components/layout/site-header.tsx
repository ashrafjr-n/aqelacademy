import Image from "next/image";
import Link from "next/link";
import { HeaderAccount } from "@/components/header/header-account";
import { LanguageSwitch } from "@/components/header/language-switch";
import { MainNav } from "@/components/header/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { site, siteText } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";

interface SiteHeaderProps {
  locale: Locale;
}

/** Static on purpose: the signed-in parts load on the client (HeaderAccount), so public pages stay prerendered. */
export function SiteHeader({ locale }: SiteHeaderProps) {
  const text = siteText[locale];
  const links = text.nav.map((link) => ({ ...link, href: localePath(locale, link.href) }));

  return (
    <header className="sticky top-0 z-40 border-t-2 border-b border-t-gold border-b-line bg-white/95 backdrop-blur-sm">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        {text.chrome.skipToContent}
      </a>
      <div className="container-site flex h-16 items-center gap-6">
        <Link href={localePath(locale, "/")} className="flex shrink-0 items-center gap-3">
          <Image src={site.logo.src} alt={text.logoAlt} className="size-12" sizes="48px" preload />
          <span className="hidden md:block lg:hidden xl:block">
            <span className="block font-heading text-lg font-bold leading-snug text-ink">{text.name}</span>
            <span className="block text-xs text-body">{text.tagline}</span>
          </span>
        </Link>

        <MainNav links={links} label={text.chrome.mainMenu} />

        <div className="ms-auto flex items-center gap-1.5">
          <LanguageSwitch locale={locale} label={text.chrome.switchLanguage} />
          <HeaderAccount />
          <MobileNav links={links} label={text.chrome.mainMenu} buttonLabel={text.chrome.menu} />
        </div>
      </div>
    </header>
  );
}
