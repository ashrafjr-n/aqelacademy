import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteText } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import type { NavLink } from "@/types/content";

interface PageHeaderProps {
  title: string;
  /** Parent pages above this one, as locale-free paths; the header links back to the nearest one (the home page when empty). */
  parents?: NavLink[];
  /** A shorter band with a smaller title, for long document pages. */
  compact?: boolean;
}

/** The title band at the top of public pages, with a link back to the page above. */
export async function PageHeader({ title, parents = [], compact = false }: PageHeaderProps) {
  const locale = await getLocale();
  const { chrome } = siteText[locale];
  const back: NavLink = parents.at(-1) ?? { href: "/", label: chrome.home };

  return (
    <div className="border-b border-line bg-canvas">
      <div className={`container-site ${compact ? "py-8 sm:py-10" : "py-12 sm:py-16"}`}>
        <nav aria-label={chrome.breadcrumb}>
          <Link
            href={localePath(locale, back.href)}
            className="group inline-flex items-center gap-2 text-sm font-bold text-body transition-colors hover:text-ink"
          >
            <ArrowRight aria-hidden="true" className="size-4 text-gold transition-transform ltr:rotate-180 rtl:group-hover:translate-x-0.5 ltr:group-hover:-translate-x-0.5" />
            {back.label}
          </Link>
        </nav>
        <h1 className={`max-w-3xl font-heading font-bold leading-snug text-ink ${compact ? "mt-3 text-2xl md:text-3xl md:leading-snug" : "mt-4 text-3xl md:text-4xl md:leading-snug"}`}>{title}</h1>
        <span aria-hidden="true" className={`block h-0.5 w-12 bg-gold ${compact ? "mt-4" : "mt-5"}`} />
      </div>
    </div>
  );
}
