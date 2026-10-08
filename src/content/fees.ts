import type { Locale } from "@/lib/i18n";

/** Bump it when the prices in `courses.ts` or this text change. */
const updatedAt = "2026-10-08";

interface FeesCopy {
  title: string;
  intro: string;
  lastUpdated: string;
  course: string;
  hours: string;
  fee: string;
  notesTitle: string;
  notes: string[];
  refundLink: string;
  updatedAt: string;
}

/** The standalone course fees page (`/course-fees`); the prices themselves come from the courses. */
export const feesCopy: Record<Locale, FeesCopy> = {
  ar: {
    title: "رسوم الدورات التدريبية",
    intro: "تعرض هذه الصفحة الرسوم المعتمدة لجميع الدورات التدريبية في الأكاديمية.",
    lastUpdated: "آخر تحديث:",
    course: "الدورة",
    hours: "ساعات التدريب",
    fee: "الرسوم",
    notesTitle: "ملاحظات",
    notes: [
      "جميع الرسوم بالدولار الأمريكي (USD)، وهي رسوم الدورة كاملة.",
      "لا يتم الدفع عبر الموقع: بعد إرسال طلب الحجز يتواصل معك فريق الأكاديمية لتأكيد التسجيل وترتيب طريقة الدفع.",
    ],
    refundLink: "تخضع جميع الرسوم لسياسة الاسترجاع والاسترداد المالي",
    updatedAt,
  },
  en: {
    title: "Course fees",
    intro: "This page lists the current fees for all of the academy's training courses.",
    lastUpdated: "Last updated:",
    course: "Course",
    hours: "Training hours",
    fee: "Fee",
    notesTitle: "Notes",
    notes: [
      "All fees are in US dollars (USD) and cover the whole course.",
      "No payment is taken on the website: after you send a booking request, the academy contacts you to confirm your place and arrange payment.",
    ],
    refundLink: "All fees are subject to our refund policy",
    updatedAt,
  },
};
