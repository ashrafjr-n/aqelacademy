import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { RichText } from "@/components/ui/rich-text";
import { articles, getArticle } from "@/content/articles";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <PageHeader title={article.title} parents={[{ href: "/blog", label: "المقالات" }]} />
      <article className="container-site max-w-3xl py-16">
        <p className="flex items-center gap-2 text-sm">
          <CalendarDays aria-hidden="true" className="size-4 text-brand" />
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </p>
        <div className="relative mt-6 aspect-[3/2] overflow-hidden rounded-3xl bg-surface">
          <Image src={article.image.src} alt={article.image.alt} fill sizes="(min-width: 768px) 48rem, 100vw" preload className="object-cover" />
        </div>
        <div className="mt-10">
          <RichText blocks={article.body} />
        </div>
      </article>
    </>
  );
}
