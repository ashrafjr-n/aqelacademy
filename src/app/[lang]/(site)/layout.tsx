import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { getLocale } from "@/lib/locale";

/** Public pages: the full footer and the floating WhatsApp button. */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} />
      <WhatsAppButton locale={locale} />
    </>
  );
}
