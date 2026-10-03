import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { mainNav, site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        تخطَّ إلى المحتوى
      </a>
      <div className="container-site relative flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src={site.logo.src} alt={site.logo.alt} className="size-14" sizes="56px" preload />
          <span className="hidden text-lg font-bold text-ink sm:block">{site.name}</span>
        </Link>

        <nav aria-label="القائمة الرئيسية" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-lg px-3 py-2 font-semibold text-ink transition-colors hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav links={mainNav} />
      </div>
    </header>
  );
}
