import Image from "next/image";
import Link from "next/link";
import { HeaderAccount } from "@/components/header/header-account";
import { MainNav } from "@/components/header/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { mainNav, site } from "@/content/site";

/** Static on purpose: the signed-in parts load on the client (HeaderAccount), so public pages stay prerendered. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        تخطَّ إلى المحتوى
      </a>
      <div className="container-site flex h-16 items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image src={site.logo.src} alt={site.logo.alt} className="size-11" sizes="44px" preload />
          <span className="hidden font-bold text-ink md:block lg:hidden xl:block">{site.name}</span>
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
