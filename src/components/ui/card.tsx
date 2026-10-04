import type { ReactNode } from "react";

/** The card surface, for list items and links that can't use <Card> itself. */
export const cardClassName = "rounded-2xl border border-line bg-white shadow-card";

interface CardProps {
  title?: string;
  description?: string;
  /** Shown at the end of the title row (a link or a button). */
  action?: ReactNode;
  tone?: "default" | "danger";
  /** Drops the body padding, for edge-to-edge lists. */
  flush?: boolean;
  children: ReactNode;
}

export function Card({ title, description, action, tone = "default", flush = false, children }: CardProps) {
  const isDanger = tone === "danger";

  return (
    <section className={`overflow-hidden rounded-2xl border bg-white shadow-card ${isDanger ? "border-danger/25" : "border-line"}`}>
      {title && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <h2 className={`text-base font-bold ${isDanger ? "text-danger" : "text-ink"}`}>{title}</h2>
            {description && <p className="mt-0.5 text-sm leading-relaxed">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={flush ? undefined : "p-5 sm:p-6"}>{children}</div>
    </section>
  );
}
