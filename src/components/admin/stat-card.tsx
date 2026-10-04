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
      className={`flex items-center gap-4 rounded-3xl border p-6 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand ${highlight ? "border-brand bg-brand-soft" : "border-line bg-white"}`}
    >
      <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${highlight ? "bg-brand text-white" : "bg-surface text-brand"}`}>
        <Icon aria-hidden="true" className="size-7" />
      </span>
      <span className="flex-1">
        <span className="block text-4xl font-extrabold text-ink">{value}</span>
        <span className="mt-1 block font-bold">{label}</span>
      </span>
      <ChevronLeft aria-hidden="true" className="size-6 text-body" />
    </Link>
  );
}
