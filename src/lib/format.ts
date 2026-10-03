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
