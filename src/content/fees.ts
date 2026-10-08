import type { Locale } from "@/lib/i18n";

/** Bump it when the prices in `courses.ts` or this text change. */
const updatedAt = "2026-10-08";

interface FeesCopy {
  title: string;
  lastUpdated: string;
  refundLink: string;
  updatedAt: string;
}

/** The standalone course fees page (`/course-fees`); the prices themselves come from the courses. */
export const feesCopy: Record<Locale, FeesCopy> = {
  ar: {
    title: "رسوم الدورات التدريبية",
    lastUpdated: "آخر تحديث:",
    refundLink: "تخضع جميع الرسوم لسياسة الاسترجاع والاسترداد المالي",
    updatedAt,
  },
  en: {
    title: "Course fees",
    lastUpdated: "Last updated:",
    refundLink: "All fees are subject to our refund policy",
    updatedAt,
  },
};
