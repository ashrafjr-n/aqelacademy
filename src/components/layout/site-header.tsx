import Image from "next/image";
import Link from "next/link";
import { HeaderAccount } from "@/components/header/header-account";
import { MainNav } from "@/components/header/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { mainNav, site } from "@/content/site";

/** Static on purpose: the signed-in parts load on the client (HeaderAccount), so public pages stay prerendered. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-t-2 border-b border-t-gold border-b-line bg-white/95 backdrop-blur-sm">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        تخطَّ إلى المحتوى
      </a>
      <div className="container-site flex h-16 items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image src={site.logo.src} alt={site.logo.alt} className="size-12" sizes="48px" preload />
          <span className="hidden md:block lg:hidden xl:block">
            <span className="block font-heading text-lg font-bold leading-snug text-ink">{site.name}</span>
            <span className="block text-xs text-body">{site.tagline}</span>
          </span>
        </Link>

        <MainNav links={mainNav} />

        <div className="ms-auto flex items-center gap-1.5">
          <HeaderAccount />
          <MobileNav links={mainNav} />
        </div>
      </div>
    </header>
  );
}
