import { site } from "@/content/site";

/** wa.me link to any E.164 number ("+962…"), optionally with a prefilled message. */
export function whatsappLinkTo(phoneE164: string, message?: string): string {
  const base = `https://wa.me/${phoneE164.replace(/^\+/, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** The academy's own WhatsApp. */
export function whatsappUrl(message?: string): string {
  return whatsappLinkTo(site.contact.whatsapp, message);
}
