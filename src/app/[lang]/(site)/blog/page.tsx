import type { Metadata } from "next";
import { ArticleGrid } from "@/components/blog/article-grid";
import { PageHeader } from "@/components/ui/page-header";
import { articleCopy, getArticles } from "@/content/articles";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: articleCopy[locale].listTitle, alternates: languageAlternates(locale, "/blog") };
}

export default async function BlogPage() {
  const locale = await getLocale();

  return (
    <>
      <PageHeader title={articleCopy[locale].listTitle} />
      <section className="container-site py-20">
        <ArticleGrid articles={getArticles(locale)} preloadFirst />
      </section>
    </>
  );
}
