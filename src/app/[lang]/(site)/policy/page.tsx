import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { RichText } from "@/components/ui/rich-text";
import { policy } from "@/content/policy";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: policy.title,
};

export default function PolicyPage() {
  return (
    <>
      <PageHeader title={policy.title} />
      <div className="container-site py-20">
        <article className="mx-auto max-w-3xl">
          <p className="mb-8 text-sm">
            آخر تحديث: <time dateTime={policy.updatedAt}>{formatDate(policy.updatedAt)}</time>
          </p>
          <RichText blocks={policy.body} />
        </article>
      </div>
    </>
  );
}
