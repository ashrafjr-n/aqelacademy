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

export type BookingFailure = "duplicate" | "rate_limited" | "unavailable";

export const bookingCopy = {
  bookTitle: "تأكيد الحجز",
  bookIntro: "راجع تفاصيل الدورة ثم أكّد طلبك. سيصل الطلب إلى الدكتور ليراجعه ويتواصل معك.",
  noteHint: "مثل الوقت المناسب للتواصل. لا تكتب معلومات صحية أو شخصية حساسة.",
  phoneTip: "أضف رقم هاتفك في صفحة بياناتك ليتمكن الدكتور من التواصل معك أسرع.",
  alreadyBooked: "لديك طلب قائم لهذه الدورة.",
  listTitle: "حجوزاتي",
  empty: "لم تحجز أي دورة بعد.",
  failures: {
    duplicate: "لديك طلب قائم لهذه الدورة بالفعل.",
    rate_limited: "وصلت إلى الحد اليومي لطلبات الحجز. حاول مرة أخرى غدًا.",
    unavailable: "هذه الدورة غير متاحة للحجز حاليًا.",
  } satisfies Record<BookingFailure, string>,
};
