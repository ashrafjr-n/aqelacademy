import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppFooter } from "@/components/layout/app-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageHeader } from "@/components/ui/page-header";
import { TabNav } from "@/components/ui/tab-nav";
import { adminCopy, adminTabs } from "@/content/admin";
import { requireAdmin } from "@/lib/dal/admin";

export const metadata: Metadata = {
  title: adminCopy.title,
  robots: { index: false, follow: false },
};

/** Larger text throughout: the dashboard is designed for the doctor, not for developers. */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-canvas">
        <PageHeader title={adminCopy.title} />
        <div className="container-site py-10 text-lg">
          <div className="mx-auto max-w-3xl space-y-8">
            <TabNav tabs={adminTabs} label="أقسام لوحة الدكتور" />
            {children}
          </div>
        </div>
      </main>
      <AppFooter />
    </>
  );
}
