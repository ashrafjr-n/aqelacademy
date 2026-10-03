import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { footerLinks, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-surface">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Image src={site.logo.src} alt={site.logo.alt} className="size-20" sizes="80px" />
          <p className="mt-4 font-bold text-ink">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed">{site.description}</p>
        </div>

        <nav aria-label="روابط سريعة">
          <h2 className="text-lg font-bold text-ink">روابط سريعة</h2>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-lg font-bold text-ink">اتصل بنا</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="size-5 shrink-0 text-brand" />
              {site.contact.location}
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden="true" className="size-5 shrink-0 text-brand" />
              <a href={`tel:${site.contact.phone}`} dir="ltr" className="hover:text-brand">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" className="size-5 shrink-0 text-brand" />
              <a href={`mailto:${site.contact.email}`} className="break-all hover:text-brand">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-5 text-center text-sm">
        © {year} {site.name}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
