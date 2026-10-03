import type { StatusTone } from "@/content/bookings";

const toneClasses: Record<StatusTone, string> = {
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
  danger: "bg-danger-soft text-danger",
};

interface StatusBadgeProps {
  tone: StatusTone;
  label: string;
}

export function StatusBadge({ tone, label }: StatusBadgeProps) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${toneClasses[tone]}`}>{label}</span>;
}
