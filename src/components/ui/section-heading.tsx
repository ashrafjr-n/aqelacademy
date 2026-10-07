import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import type { NavLink } from "@/types/content";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** A locale-free link; the heading adds the /en prefix. */
  action?: NavLink;
}

export async function SectionHeading({ title, subtitle, action }: SectionHeadingProps) {
  const locale = await getLocale();

  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-heading text-2xl font-bold leading-snug text-ink md:text-3xl md:leading-snug">{title}</h2>
        <span aria-hidden="true" className="mt-3 block h-0.5 w-12 bg-gold" />
        {subtitle && <p className="mt-3 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
      {action && (
        <Link href={localePath(locale, action.href)} className="group inline-flex items-center gap-1.5 font-bold text-ink transition-colors hover:text-gold-dark">
          {action.label}
          <ArrowLeft aria-hidden="true" className="size-4 transition-transform ltr:rotate-180 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
