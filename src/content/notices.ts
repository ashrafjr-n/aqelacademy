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
  "booking-approved": { tone: "success", text: "تمت الموافقة على الطلب، وسيصل للطالب إشعار بذلك." },
  "booking-rejected": { tone: "success", text: "تم رفض الطلب، وسيصل للطالب إشعار بذلك." },
  "booking-pending": { tone: "success", text: "أُعيد الطلب إلى قائمة الانتظار." },
  "decision-failed": { tone: "error", text: "لم يتم حفظ القرار. حدّث الصفحة وحاول مرة أخرى." },
} satisfies Record<string, Notice>;

export function getNotice(code: unknown): Notice | undefined {
  return typeof code === "string" && code in notices ? notices[code as keyof typeof notices] : undefined;
}
