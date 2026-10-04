import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { NavLink } from "@/types/content";

interface PageHeaderProps {
  title: string;
  /** Parent pages between "الرئيسية" and the current page. */
  parents?: NavLink[];
}

/** The navy title band at the top of public pages, with the breadcrumb trail. */
export function PageHeader({ title, parents = [] }: PageHeaderProps) {
  const trail: NavLink[] = [{ href: "/", label: "الرئيسية" }, ...parents];

  return (
    <div className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute -top-28 -start-20 -z-10 size-80 rounded-full bg-brand/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 end-10 -z-10 size-96 rounded-full bg-white/5 blur-3xl" />
      <div className="container-site py-12 sm:py-14">
        <nav aria-label="مسار التنقل">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            {trail.map((link) => (
              <li key={link.href} className="flex items-center gap-1.5">
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
                <ChevronLeft aria-hidden="true" className="size-3.5" />
              </li>
            ))}
            <li aria-current="page" className="text-white">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-4xl">{title}</h1>
      </div>
    </div>
  );
}
