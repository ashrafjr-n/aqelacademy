import type { CourseLevel } from "@/types/content";

const dateFormatter = new Intl.DateTimeFormat("ar-u-nu-latn", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const courseLevelLabels: Record<CourseLevel, string> = {
  all: "جميع المستويات",
  beginner: "مبتدئ",
  intermediate: "متوسط",
  advanced: "متقدم",
};

/** "2025-11-02" → "2 نوفمبر 2025" */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

export function formatPrice(usd: number): string {
  return priceFormatter.format(usd);
}

export function formatCourseLevel(level: CourseLevel): string {
  return courseLevelLabels[level];
}

const relativeFormatter = new Intl.RelativeTimeFormat("ar-u-nu-latn", { numeric: "auto" });

const relativeSteps: [Intl.RelativeTimeFormatUnit, number][] = [
  ["minute", 60],
  ["hour", 60 * 60],
  ["day", 60 * 60 * 24],
  ["week", 60 * 60 * 24 * 7],
];

/** "منذ 5 دقائق", "أمس"… Falls back to a full date after four weeks. */
export function formatRelativeTime(isoDate: string, now: Date = new Date()): string {
  const seconds = Math.round((new Date(isoDate).getTime() - now.getTime()) / 1000);
  if (Math.abs(seconds) < 60) return "الآن";
  if (Math.abs(seconds) >= 60 * 60 * 24 * 28) return formatDate(isoDate);
  const [unit, size] = relativeSteps.findLast(([, stepSize]) => Math.abs(seconds) >= stepSize) ?? relativeSteps[0];
  return relativeFormatter.format(Math.round(seconds / size), unit);
}
