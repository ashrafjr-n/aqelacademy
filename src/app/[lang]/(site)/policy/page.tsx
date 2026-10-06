import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { RichText } from "@/components/ui/rich-text";
import { policyContent } from "@/content/policy";
import { formatDate } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: policyContent[locale].title, alternates: languageAlternates(locale, "/policy") };
}

export default async function PolicyPage() {
  const locale = await getLocale();
  const policy = policyContent[locale];

  return (
    <>
      <PageHeader title={policy.title} />
      <div className="container-site py-20">
        <article className="mx-auto max-w-3xl">
          <p className="mb-8 text-sm">
            {policy.lastUpdated} <time dateTime={policy.updatedAt}>{formatDate(policy.updatedAt, locale)}</time>
          </p>
          <RichText blocks={policy.body} />
        </article>
      </div>
    </>
  );
}
