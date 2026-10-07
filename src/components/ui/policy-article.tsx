import { PageHeader } from "@/components/ui/page-header";
import { RichText } from "@/components/ui/rich-text";
import { formatDate } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import type { PolicyDocument } from "@/types/content";

interface PolicyArticleProps {
  policy: PolicyDocument;
}

/** A legal page: title band, "last updated" date and the text. */
export async function PolicyArticle({ policy }: PolicyArticleProps) {
  const locale = await getLocale();

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
