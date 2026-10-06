import { ArticleCard } from "@/components/blog/article-card";
import { articleCopy } from "@/content/articles";
import { getLocale } from "@/lib/locale";
import type { Article } from "@/types/content";

interface ArticleGridProps {
  articles: Article[];
  /** The grid opens the page, so its first image is the main one: load it eagerly. */
  preloadFirst?: boolean;
}

export async function ArticleGrid({ articles, preloadFirst = false }: ArticleGridProps) {
  if (articles.length === 0) {
    return <p className="rounded-xl border border-line bg-canvas p-8 text-center">{articleCopy[await getLocale()].empty}</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} preload={preloadFirst && index === 0} />
      ))}
    </div>
  );
}
