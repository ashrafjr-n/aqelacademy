import type { ReactNode } from "react";
import { AppFooter } from "@/components/layout/app-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getLocale } from "@/lib/locale";

/** Account, sign-in and booking pages: a quiet background and the small footer. */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="flex-1 bg-canvas">
        {children}
      </main>
      <AppFooter locale={locale} />
    </>
  );
}
