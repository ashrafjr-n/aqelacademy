import { type LucideIcon, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { cardClassName } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactIntro } from "@/content/contact";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "اتصل بنا",
};

interface ContactChannel {
  id: "phone" | "whatsapp" | "email" | "location";
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  /** Latin-only values (numbers, emails) render left-to-right. */
  ltr?: boolean;
  external?: boolean;
}

const channels: ContactChannel[] = [
  { id: "phone", icon: Phone, label: "رقم الهاتف", value: site.contact.phoneDisplay, href: `tel:${site.contact.phone}`, ltr: true },
  { id: "whatsapp", icon: MessageCircle, label: "واتساب", value: "راسلنا مباشرة", href: whatsappUrl(), external: true },
  { id: "email", icon: Mail, label: "البريد الإلكتروني", value: site.contact.email, href: `mailto:${site.contact.email}`, ltr: true },
  { id: "location", icon: MapPin, label: "العنوان", value: site.contact.location },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader title="اتصل بنا" />
      <section className="container-site py-20">
        <div className="max-w-2xl">
          <SectionHeading title={contactIntro.title} />
          <div className="space-y-4 text-lg leading-loose">
            {contactIntro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ id, icon: Icon, label, value, href, ltr, external }) => (
            <li key={id} className={`${cardClassName} p-6`}>
              <span className={`flex size-12 items-center justify-center rounded-full ${id === "whatsapp" ? "bg-whatsapp-dark text-white" : "border border-gold/50 bg-gold-soft text-gold-dark"}`}>
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <h2 className="mt-5 font-bold text-ink">{label}</h2>
              {href ? (
                <a
                  href={href}
                  dir={ltr ? "ltr" : undefined}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="mt-1 block break-all transition-colors hover:text-gold-dark"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-1">{value}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
