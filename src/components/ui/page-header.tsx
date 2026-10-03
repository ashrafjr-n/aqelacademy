import Link from "next/link";
import type { NavLink } from "@/types/content";

interface PageHeaderProps {
  title: string;
  /** Parent pages between "الرئيسية" and the current page. */
  parents?: NavLink[];
}

export function PageHeader({ title, parents = [] }: PageHeaderProps) {
  const trail: NavLink[] = [{ href: "/", label: "الرئيسية" }, ...parents];

  return (
    <div className="border-b border-line bg-surface">
      <div className="container-site py-10">
        <nav aria-label="مسار التنقل">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {trail.map((link) => (
              <li key={link.href} className="flex items-center gap-2">
                <Link href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
                <span aria-hidden="true">/</span>
              </li>
            ))}
            <li aria-current="page" className="text-ink">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="mt-3 text-3xl font-bold text-ink md:text-4xl">{title}</h1>
      </div>
    </div>
  );
}
