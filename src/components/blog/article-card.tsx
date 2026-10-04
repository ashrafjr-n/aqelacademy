import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cardClassName } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { Article } from "@/types/content";

interface ArticleCardProps {
  article: Article;
  /** Loads the image eagerly: for the first card when it's the page's main image. */
  preload?: boolean;
}

export function ArticleCard({ article, preload = false }: ArticleCardProps) {
  const href = `/blog/${article.slug}`;

  return (
    <article className={`${cardClassName} group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift`}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={article.image.src}
          alt=""
          fill
          preload={preload}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold text-body">
          <CalendarDays aria-hidden="true" className="size-4 text-body/60" />
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
          <Link href={href} className="hover:text-brand">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed">{article.excerpt}</p>
      </div>
    </article>
  );
}
