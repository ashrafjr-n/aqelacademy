import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { RichText } from "@/components/ui/rich-text";
import { articleCopy, articleSlugs, getArticle } from "@/content/articles";
import { formatDate } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import { baseOpenGraph, languageAlternates } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getArticle(slug, locale);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: languageAlternates(locale, `/blog/${slug}`),
    openGraph: { ...baseOpenGraph(locale), type: "article", title: article.title, description: article.excerpt, images: [article.image.src.src] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getArticle(slug, locale);
  if (!article) notFound();

  return (
    <>
      <PageHeader title={article.title} parents={[{ href: "/blog", label: articleCopy[locale].listTitle }]} />
      <div className="container-site py-20">
        <article className="mx-auto max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-bold text-gold-dark">
            <CalendarDays aria-hidden="true" className="size-4 text-gold" />
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
          </p>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg bg-surface">
            <Image src={article.image.src} alt={article.image.alt} fill sizes="(min-width: 768px) 48rem, 100vw" preload className="object-cover" />
          </div>
          <div className="mt-12">
            <RichText blocks={article.body} />
          </div>
        </article>
      </div>
    </>
  );
}
