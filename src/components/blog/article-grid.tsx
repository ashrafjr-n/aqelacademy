import { ArticleCard } from "@/components/blog/article-card";
import type { Article } from "@/types/content";

interface ArticleGridProps {
  articles: Article[];
  /** The grid opens the page, so its first image is the main one: load it eagerly. */
  preloadFirst?: boolean;
}

export function ArticleGrid({ articles, preloadFirst = false }: ArticleGridProps) {
  if (articles.length === 0) {
    return <p className="rounded-2xl bg-surface p-8 text-center">لا توجد مقالات منشورة حاليًا.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} preload={preloadFirst && index === 0} />
      ))}
    </div>
  );
}
