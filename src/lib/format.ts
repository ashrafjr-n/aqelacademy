import { defaultLocale, type Locale } from "@/lib/i18n";
import type { CourseLevel } from "@/types/content";

/** Arabic keeps Latin digits; English is British. */
const intlLocales: Record<Locale, string> = { ar: "ar-u-nu-latn", en: "en-GB" };

const dateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  ar: new Intl.DateTimeFormat(intlLocales.ar, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  en: new Intl.DateTimeFormat(intlLocales.en, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const courseLevelLabels: Record<Locale, Record<CourseLevel, string>> = {
  ar: { all: "جميع المستويات", beginner: "مبتدئ", intermediate: "متوسط", advanced: "متقدم" },
  en: { all: "All levels", beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
};

/** "2025-11-02" → "2 نوفمبر 2025" / "2 November 2025" */
export function formatDate(isoDate: string, locale: Locale = defaultLocale): string {
  return dateFormatters[locale].format(new Date(isoDate));
}

export function formatPrice(usd: number): string {
  return priceFormatter.format(usd);
}

export function formatCourseLevel(level: CourseLevel, locale: Locale): string {
  return courseLevelLabels[locale][level];
}

const pluralRules = new Intl.PluralRules("ar");

/** A counted noun in each Arabic number form; `#` stands for the number. `zero` falls back to `other`. */
export type CountForms = Record<Exclude<Intl.LDMLPluralRule, "zero">, string> & { zero?: string };

/** "طلب واحد", "طلبان", "3 طلبات", "11 طلبًا", "100 طلب": the browser's Arabic plural rules pick the form. */
export function formatCount(count: number, forms: CountForms): string {
  const category = pluralRules.select(count);
  const form = category === "zero" ? (forms.zero ?? forms.other) : forms[category];
  return form.replace("#", String(count));
}

/** English counted nouns: "1 week", "10 weeks". */
export function formatEnglishCount(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

const relativeFormatters: Record<Locale, Intl.RelativeTimeFormat> = {
  ar: new Intl.RelativeTimeFormat(intlLocales.ar, { numeric: "auto" }),
  en: new Intl.RelativeTimeFormat(intlLocales.en, { numeric: "auto" }),
};

const justNow: Record<Locale, string> = { ar: "الآن", en: "just now" };

const relativeSteps: [Intl.RelativeTimeFormatUnit, number][] = [
  ["minute", 60],
  ["hour", 60 * 60],
  ["day", 60 * 60 * 24],
  ["week", 60 * 60 * 24 * 7],
];

/** "منذ 5 دقائق", "أمس" / "5 minutes ago", "yesterday"… Falls back to a full date after four weeks. */
export function formatRelativeTime(isoDate: string, locale: Locale = defaultLocale, now: Date = new Date()): string {
  const seconds = Math.round((new Date(isoDate).getTime() - now.getTime()) / 1000);
  if (Math.abs(seconds) < 60) return justNow[locale];
  if (Math.abs(seconds) >= 60 * 60 * 24 * 28) return formatDate(isoDate, locale);
  const [unit, size] = relativeSteps.findLast(([, stepSize]) => Math.abs(seconds) >= stepSize) ?? relativeSteps[0];
  return relativeFormatters[locale].format(Math.round(seconds / size), unit);
}
