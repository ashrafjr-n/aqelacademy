import type { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  description?: string;
  /** Shown at the end of the row, e.g. a primary button. */
  action?: ReactNode;
}

/** The heading row of account and dashboard pages. */
export function PageTitle({ title, description, action }: PageTitleProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl sm:leading-snug">{title}</h1>
        {description && <p className="mt-1.5 leading-relaxed">{description}</p>}
      </div>
      {action}
    </div>
  );
}
