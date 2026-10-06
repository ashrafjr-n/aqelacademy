import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { footerLinks, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-gold bg-ink-dark text-sm text-white/75">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex size-14 items-center justify-center rounded-full bg-white p-1">
              <Image src={site.logo.src} alt={site.logo.alt} sizes="56px" className="size-full" />
            </span>
            <span>
              <span className="block font-heading text-lg font-bold leading-snug text-white">{site.name}</span>
              <span className="block text-xs text-gold">{site.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm leading-loose">{site.description}</p>
        </div>

        <nav aria-label="روابط سريعة">
          <h2 className="font-bold text-gold">روابط سريعة</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:block sm:space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-bold text-gold">تواصل معنا</h2>
          <ul className="mt-4 space-y-2.5">
            <li className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-gold" />
              {site.contact.location}
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
          © {year} {site.name}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
