import { site } from "@/content/site";

/**
 * WhatsApp chat link to any E.164 number ("+962…"), optionally with a prefilled message.
 * Uses api.whatsapp.com, not wa.me: some networks reset connections to the wa.me short domain.
 */
export function whatsappLinkTo(phoneE164: string, message?: string): string {
  const base = `https://api.whatsapp.com/send?phone=${phoneE164.replace(/^\+/, "")}`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
}

/** The academy's own WhatsApp. */
export function whatsappUrl(message?: string): string {
  return whatsappLinkTo(site.contact.whatsapp, message);
}
