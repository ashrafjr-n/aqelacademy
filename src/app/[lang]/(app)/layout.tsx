import type { ReactNode } from "react";
import { AppFooter } from "@/components/layout/app-footer";
import { SiteHeader } from "@/components/layout/site-header";

/** Account, sign-in and booking pages: a quiet background and the small footer. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-canvas">
        {children}
      </main>
      <AppFooter />
    </>
  );
}
