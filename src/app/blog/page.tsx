import type { Metadata } from "next";
import { ArticleGrid } from "@/components/blog/article-grid";
import { PageHeader } from "@/components/ui/page-header";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "المقالات",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader title="المقالات" />
      <section className="container-site py-16">
        <ArticleGrid articles={articles} />
      </section>
    </>
  );
}
