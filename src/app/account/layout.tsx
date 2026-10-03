import type { ReactNode } from "react";
import { AccountTabs } from "@/components/account/account-tabs";
import { PageHeader } from "@/components/ui/page-header";
import { accountTabs } from "@/content/account";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader title="حسابي" />
      <div className="container-site py-10">
        <div className="mx-auto max-w-2xl space-y-8">
          <AccountTabs tabs={accountTabs} />
          {children}
        </div>
      </div>
    </>
  );
}
