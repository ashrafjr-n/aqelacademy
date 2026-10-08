import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { PolicySectionCards } from "@/components/ui/policy-section-cards";
import { refundPolicy, refundPolicyUpdatedAt } from "@/content/refund-policy";
import { formatDate } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: refundPolicy[locale].title, alternates: languageAlternates(locale, "/refund-policy") };
}

export default async function RefundPolicyPage() {
  const locale = await getLocale();
  const { title, lastUpdated, intro, sections } = refundPolicy[locale];

  return (
    <>
      <PageHeader title={title} compact />
      <div className="container-site py-14">
        <p className="text-sm">
          {lastUpdated} <time dateTime={refundPolicyUpdatedAt}>{formatDate(refundPolicyUpdatedAt, locale)}</time>
        </p>
        <p className="mt-4 max-w-3xl text-lg leading-loose">{intro}</p>
        <PolicySectionCards sections={sections} className="mt-10 md:grid-cols-2" />
      </div>
    </>
  );
}
