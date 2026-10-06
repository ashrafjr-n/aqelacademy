import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { site, siteText } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";

interface SiteFooterProps {
  locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const text = siteText[locale];

  return (
    <footer className="border-t-2 border-gold bg-ink-dark text-sm text-white/75">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href={localePath(locale, "/")} className="inline-flex items-center gap-3">
            <span className="flex size-14 items-center justify-center rounded-full bg-white p-1">
              <Image src={site.logo.src} alt={text.logoAlt} sizes="56px" className="size-full" />
            </span>
            <span>
              <span className="block font-heading text-lg font-bold leading-snug text-white">{text.name}</span>
              <span className="block text-xs text-gold">{text.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm leading-loose">{text.description}</p>
        </div>

        <nav aria-label={text.chrome.quickLinks}>
          <h2 className="font-bold text-gold">{text.chrome.quickLinks}</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:block sm:space-y-2.5">
            {text.footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={localePath(locale, link.href)} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-bold text-gold">{text.chrome.contactUs}</h2>
          <ul className="mt-4 space-y-2.5">
            <li className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-gold" />
              {text.location}
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden="true" className="size-4 shrink-0 text-gold" />
              <a href={`tel:${site.contact.phone}`} dir="ltr" className="transition-colors hover:text-white">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${site.contact.email}`} className="break-all transition-colors hover:text-white">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="container-site py-5 text-center text-xs text-white/60">
          © {year} {text.name}. {text.chrome.rights}
        </p>
      </div>
    </footer>
  );
}
