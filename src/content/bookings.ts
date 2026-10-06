import type { Database } from "@/types/database";

export type BookingStatus = Database["public"]["Enums"]["booking_status"];
export type StatusTone = "warning" | "success" | "danger";

export const bookingStatuses: Record<BookingStatus, { label: string; tone: StatusTone; description: string }> = {
  pending: {
    label: "بانتظار الموافقة",
    tone: "warning",
    description: "وصل طلبك إلى الدكتور، وسيراجعه قريبًا.",
  },
  approved: {
    label: "تمت الموافقة",
    tone: "success",
    description: "تمت الموافقة على طلبك. انتظر رسالة من الدكتور لترتيب التفاصيل.",
  },
  rejected: {
    label: "لم تتم الموافقة",
    tone: "danger",
    description: "نعتذر، لم تتم الموافقة على هذا الطلب. تواصل معنا إن كان لديك استفسار.",
  },
};

/** What happens after booking, shown on the booking page. */
export const bookingFlow = [
  { title: "أرسل طلبك", text: "أكّد الحجز من هذه الصفحة، مع ملاحظة للدكتور إن أردت." },
  { title: "يراجعه الدكتور", text: "يصلك إشعار هنا وعلى بريدك عند الرد على طلبك." },
  { title: "التواصل والترتيب", text: "بعد الموافقة يتواصل معك الدكتور لترتيب التفاصيل." },
];

export type BookingFailure = "duplicate" | "rate_limited" | "unavailable";

export const bookingCopy = {
  bookNow: "احجز مقعدك الآن",
  seatsLimited: "المقاعد محدودة",
  /** The heading of the booking box on the course page. */
  courseStatusTitles: {
    pending: "تم إرسال طلب الحجز",
    approved: "تمت الموافقة على حجزك",
    rejected: "طلبك السابق",
  } satisfies Record<BookingStatus, string>,
  messageDoctor: "مراسلة الدكتور",
  bookTitle: "تأكيد الحجز",
  bookIntro: "راجع تفاصيل الدورة ثم أكّد طلبك. سيصل الطلب إلى الدكتور ليراجعه ويتواصل معك.",
  flowTitle: "كيف يتم الحجز؟",
  formTitle: "تأكيد الطلب",
  noteHint: "مثل الوقت المناسب للتواصل. لا تكتب معلومات صحية أو شخصية حساسة.",
  phoneTip: "أضف رقم هاتفك ليتواصل معك الدكتور بسرعة أكبر، من صفحة",
  requestedOn: "طُلب في",
  yourNote: "ملاحظتك",
  openDetails: "تفاصيل الطلب",
  failures: {
    duplicate: "لديك طلب قائم لهذه الدورة بالفعل.",
    rate_limited: "وصلت إلى الحد اليومي لطلبات الحجز. حاول مرة أخرى غدًا.",
    unavailable: "هذه الدورة غير متاحة للحجز حاليًا.",
  } satisfies Record<BookingFailure, string>,
};
