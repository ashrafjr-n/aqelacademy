import type { ReactNode } from "react";

interface EmptyStateProps {
  /** A rendered icon element. */
  icon: ReactNode;
  title: string;
  text?: string;
  action?: ReactNode;
}

/** What an empty list shows instead of nothing. */
export function EmptyState({ icon, title, text, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-surface text-ink/50 [&>svg]:size-7">{icon}</span>
      <p className="mt-4 font-bold text-ink">{title}</p>
      {text && <p className="mt-1 max-w-sm text-sm leading-relaxed">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
