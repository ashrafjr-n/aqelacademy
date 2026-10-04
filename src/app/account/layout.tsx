import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { TabNav } from "@/components/ui/tab-nav";
import { accountTabs } from "@/content/account";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader title="حسابي" />
      <div className="container-site py-10">
        <div className="mx-auto max-w-2xl space-y-8">
          <TabNav tabs={accountTabs} label="أقسام الحساب" />
          {children}
        </div>
      </div>
    </>
  );
}
