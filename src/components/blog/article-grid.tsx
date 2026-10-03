import { ArticleCard } from "@/components/blog/article-card";
import type { Article } from "@/types/content";

interface ArticleGridProps {
  articles: Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return <p className="rounded-2xl bg-surface p-8 text-center">لا توجد مقالات منشورة حاليًا.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
