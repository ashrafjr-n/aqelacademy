import { ChevronLeft, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  href: string;
  label: string;
  value: number;
  icon: LucideIcon;
  /** Highlights the card when it needs the doctor's attention. */
  highlight?: boolean;
}

export function StatCard({ href, label, value, icon: Icon, highlight = false }: StatCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-4 rounded-xl border p-5 shadow-card transition-shadow hover:shadow-lift focus-visible:outline-2 focus-visible:outline-brand ${highlight ? "border-brand/30 bg-brand-soft" : "border-line bg-white"}`}
    >
      <span className="flex items-center justify-between">
        <span className={`flex size-11 items-center justify-center rounded-xl ${highlight ? "bg-brand text-white" : "bg-surface text-ink/70"}`}>
          <Icon aria-hidden="true" className="size-6" />
        </span>
        <ChevronLeft aria-hidden="true" className="size-5 text-body/40 transition-colors group-hover:text-body" />
      </span>
      <span>
        <span className="block text-4xl font-extrabold tabular-nums text-ink">{value}</span>
        <span className="mt-1 block text-base font-bold">{label}</span>
      </span>
    </Link>
  );
}
