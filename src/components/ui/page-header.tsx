import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { siteText } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import type { NavLink } from "@/types/content";

interface PageHeaderProps {
  title: string;
  /** Parent pages between the home page and the current page, as locale-free paths. */
  parents?: NavLink[];
  /** A shorter band with a smaller title, for long document pages. */
  compact?: boolean;
}

/** The title band at the top of public pages, with the breadcrumb trail. */
export async function PageHeader({ title, parents = [], compact = false }: PageHeaderProps) {
  const locale = await getLocale();
  const { chrome } = siteText[locale];
  const trail: NavLink[] = [{ href: "/", label: chrome.home }, ...parents];

  return (
    <div className="border-b border-line bg-canvas">
      <div className={`container-site ${compact ? "py-8 sm:py-10" : "py-12 sm:py-16"}`}>
        <nav aria-label={chrome.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            {trail.map((link) => (
              <li key={link.href} className="flex items-center gap-1.5">
                <Link href={localePath(locale, link.href)} className="transition-colors hover:text-ink">
                  {link.label}
                </Link>
                <ChevronLeft aria-hidden="true" className="size-3.5 text-gold ltr:rotate-180" />
              </li>
            ))}
            <li aria-current="page" className="font-bold text-ink">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className={`max-w-3xl font-heading font-bold leading-snug text-ink ${compact ? "mt-3 text-2xl md:text-3xl md:leading-snug" : "mt-4 text-3xl md:text-4xl md:leading-snug"}`}>{title}</h1>
        <span aria-hidden="true" className={`block h-0.5 w-12 bg-gold ${compact ? "mt-4" : "mt-5"}`} />
      </div>
    </div>
  );
}
