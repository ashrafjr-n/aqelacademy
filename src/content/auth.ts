export type NoticeTone = "error" | "success";

export interface Notice {
  tone: NoticeTone;
  text: string;
}

/** Messages shown after a redirect, selected by a fixed `?notice=` code (never free text). */
const notices = {
  "link-invalid": { tone: "error", text: "الرابط غير صالح أو انتهت صلاحيته. اطلب رابطًا جديدًا." },
  "email-confirmed": { tone: "success", text: "تم تأكيد بريدك الإلكتروني. أهلًا بك في الأكاديمية!" },
  "password-updated": { tone: "success", text: "تم تغيير كلمة المرور بنجاح." },
  "booking-created": { tone: "success", text: "تم إرسال طلب الحجز! سيراجعه الدكتور ويصلك إشعار بالرد." },
} satisfies Record<string, Notice>;

export function getNotice(code: unknown): Notice | undefined {
  return typeof code === "string" && code in notices ? notices[code as keyof typeof notices] : undefined;
}

export const authCopy = {
  login: {
    title: "تسجيل الدخول",
    subtitle: "أهلًا بعودتك. أدخل بريدك الإلكتروني وكلمة المرور.",
  },
  register: {
    title: "إنشاء حساب",
    subtitle: "سجّل لتتمكن من حجز الدورات ومتابعة طلباتك والتواصل مع الدكتور.",
    success:
      "تم إنشاء حسابك! أرسلنا رابط التأكيد إلى بريدك الإلكتروني. افتح الرسالة واضغط الرابط لتفعيل حسابك (تفقّد مجلد الرسائل غير المرغوب فيها إن لم تجدها).",
  },
  forgotPassword: {
    title: "نسيت كلمة المرور",
    subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لتعيين كلمة مرور جديدة.",
    success: "إذا كان البريد مسجّلًا لدينا، ستصلك رسالة فيها رابط لتعيين كلمة مرور جديدة.",
  },
  resetPassword: {
    title: "تعيين كلمة مرور جديدة",
    subtitle: "اختر كلمة مرور جديدة لحسابك.",
  },
  confirm: {
    title: "تأكيد الرابط",
    subtitle: "اضغط الزر لإكمال العملية.",
  },
  resendConfirmation: {
    prompt: "لم يصلك رابط التأكيد؟",
    success: "أرسلنا رابط تأكيد جديدًا إلى بريدك. تفقّد صندوق الوارد ومجلد الرسائل غير المرغوب فيها (Spam).",
  },
} as const;

/** Side panel on the sign-in and sign-up pages (large screens). */
export const authPanel = {
  title: "منصّتك للتدريب في تحليل السلوك التطبيقي والتأهيل",
  points: ["احجز دورتك بخطوات بسيطة", "تابع حالة طلبك أولًا بأول", "تواصل مباشرة مع الدكتور"],
  security: "بياناتك محمية ومشفّرة",
};
