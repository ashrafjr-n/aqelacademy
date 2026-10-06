import { defaultLocale, type Locale } from "@/lib/i18n";

export type NoticeTone = "error" | "success";

export interface Notice {
  tone: NoticeTone;
  text: string;
}

type NoticeCode =
  | "link-invalid"
  | "email-confirmed"
  | "password-updated"
  | "account-deleted"
  | "booking-approved"
  | "booking-rejected"
  | "booking-pending"
  | "decision-failed"
  | "decision-conflict";

/** Messages shown after a redirect, selected by a fixed `?notice=` code (never free text). */
const notices: Record<Locale, Record<NoticeCode, Notice>> = {
  ar: {
    "link-invalid": { tone: "error", text: "الرابط غير صالح أو انتهت صلاحيته. اطلب رابطًا جديدًا." },
    "email-confirmed": { tone: "success", text: "تم تأكيد بريدك الإلكتروني. أهلًا بك في الأكاديمية!" },
    "password-updated": { tone: "success", text: "تم تغيير كلمة المرور بنجاح." },
    "account-deleted": { tone: "success", text: "تم حذف حسابك وجميع بياناتك نهائيًا." },
    "booking-approved": { tone: "success", text: "تمت الموافقة على الطلب، وسيصل للطالب إشعار بذلك." },
    "booking-rejected": { tone: "success", text: "تم رفض الطلب، وسيصل للطالب إشعار بذلك." },
    "booking-pending": { tone: "success", text: "أُعيد الطلب إلى قائمة الانتظار." },
    "decision-failed": { tone: "error", text: "لم يتم حفظ القرار. حدّث الصفحة وحاول مرة أخرى." },
    "decision-conflict": {
      tone: "error",
      text: "لم يتم حفظ القرار: لدى الطالب طلب أحدث مفتوح لنفس الدورة. اتخذ قرارك في الطلب الأحدث.",
    },
  },
  en: {
    "link-invalid": { tone: "error", text: "This link is invalid or has expired. Please ask for a new one." },
    "email-confirmed": { tone: "success", text: "Your email address is confirmed. Welcome to the academy!" },
    "password-updated": { tone: "success", text: "Your password has been changed." },
    "account-deleted": { tone: "success", text: "Your account and all your data have been permanently deleted." },
    "booking-approved": { tone: "success", text: "The request is approved, and the student will be notified." },
    "booking-rejected": { tone: "success", text: "The request is declined, and the student will be notified." },
    "booking-pending": { tone: "success", text: "The request is back on the waiting list." },
    "decision-failed": { tone: "error", text: "The decision wasn't saved. Refresh the page and try again." },
    "decision-conflict": {
      tone: "error",
      text: "The decision wasn't saved: the student has a newer open request for the same course. Please decide on that one instead.",
    },
  },
};

export function getNotice(code: unknown, locale: Locale = defaultLocale): Notice | undefined {
  return typeof code === "string" && code in notices[locale] ? notices[locale][code as NoticeCode] : undefined;
}
