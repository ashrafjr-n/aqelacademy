import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Article } from "@/types/content";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const href = `/blog/${article.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative aspect-[3/2] overflow-hidden bg-surface">
        <Image
          src={article.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm">
          <CalendarDays aria-hidden="true" className="size-4 text-brand" />
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
          <Link href={href} className="hover:text-brand">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{article.excerpt}</p>
      </div>
    </article>
  );
}
