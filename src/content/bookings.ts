import { defaultLocale, type Locale } from "@/lib/i18n";
import type { Database } from "@/types/database";

export type BookingStatus = Database["public"]["Enums"]["booking_status"];
export type StatusTone = "warning" | "success" | "danger";
export type BookingFailure = "duplicate" | "rate_limited" | "unavailable";

const statusTones: Record<BookingStatus, StatusTone> = { pending: "warning", approved: "success", rejected: "danger" };

interface BookingCopy {
  statuses: Record<BookingStatus, { label: string; description: string }>;
  /** What happens after booking, shown on the booking page. */
  flow: { title: string; text: string }[];
  bookNow: string;
  seatsLimited: string;
  /** The heading of the booking box on the course page. */
  courseStatusTitles: Record<BookingStatus, string>;
  messageDoctor: string;
  openDetails: string;
  bookTitle: string;
  bookIntro: string;
  flowTitle: string;
  formTitle: string;
  noteLabel: string;
  noteHint: string;
  submit: string;
  pending: string;
  /** Around the link to the profile page. */
  phoneTipBefore: string;
  phoneTipAfter: string;
  requestedOn: string;
  yourNote: string;
  failures: Record<BookingFailure, string>;
}

export const bookingCopy: Record<Locale, BookingCopy> = {
  ar: {
    statuses: {
      pending: { label: "بانتظار الموافقة", description: "وصل طلبك إلى الدكتور، وسيراجعه قريبًا." },
      approved: { label: "تمت الموافقة", description: "تمت الموافقة على طلبك. انتظر رسالة من الدكتور لترتيب التفاصيل." },
      rejected: { label: "لم تتم الموافقة", description: "نعتذر، لم تتم الموافقة على هذا الطلب. تواصل معنا إن كان لديك استفسار." },
    },
    flow: [
      { title: "أرسل طلبك", text: "أكّد الحجز من هذه الصفحة، مع ملاحظة للدكتور إن أردت." },
      { title: "يراجعه الدكتور", text: "يصلك إشعار هنا وعلى بريدك عند الرد على طلبك." },
      { title: "التواصل والترتيب", text: "بعد الموافقة يتواصل معك الدكتور لترتيب التفاصيل." },
    ],
    bookNow: "احجز مقعدك الآن",
    seatsLimited: "المقاعد محدودة",
    courseStatusTitles: { pending: "تم إرسال طلب الحجز", approved: "تمت الموافقة على حجزك", rejected: "طلبك السابق" },
    messageDoctor: "مراسلة الدكتور",
    openDetails: "تفاصيل الطلب",
    bookTitle: "تأكيد الحجز",
    bookIntro: "راجع تفاصيل الدورة ثم أكّد طلبك. سيصل الطلب إلى الدكتور ليراجعه ويتواصل معك.",
    flowTitle: "كيف يتم الحجز؟",
    formTitle: "تأكيد الطلب",
    noteLabel: "ملاحظة للدكتور",
    noteHint: "مثل الوقت المناسب للتواصل. لا تكتب معلومات صحية أو شخصية حساسة.",
    submit: "تأكيد الحجز",
    pending: "جارٍ إرسال الطلب…",
    phoneTipBefore: "أضف رقم هاتفك ليتواصل معك الدكتور بسرعة أكبر، من صفحة",
    phoneTipAfter: "",
    requestedOn: "طُلب في",
    yourNote: "ملاحظتك",
    failures: {
      duplicate: "لديك طلب قائم لهذه الدورة بالفعل.",
      rate_limited: "وصلت إلى الحد اليومي لطلبات الحجز. حاول مرة أخرى غدًا.",
      unavailable: "هذه الدورة غير متاحة للحجز حاليًا.",
    },
  },
  en: {
    statuses: {
      pending: { label: "Awaiting approval", description: "Your request has reached the doctor, who will review it soon." },
      approved: { label: "Approved", description: "Your request is approved. The doctor will message you to arrange the details." },
      rejected: { label: "Not approved", description: "Sorry, this request wasn't approved. Please contact us if you have any questions." },
    },
    flow: [
      { title: "Send your request", text: "Confirm your booking on this page, with a note for the doctor if you like." },
      { title: "The doctor reviews it", text: "You'll get a notification here and by email when the doctor replies." },
      { title: "Contact and arrangements", text: "Once your request is approved, the doctor will contact you to arrange the details." },
    ],
    bookNow: "Book your place now",
    seatsLimited: "Places are limited",
    courseStatusTitles: { pending: "Booking request sent", approved: "Your booking is approved", rejected: "Your previous request" },
    messageDoctor: "Message the doctor",
    openDetails: "Request details",
    bookTitle: "Confirm your booking",
    bookIntro: "Check the course details, then confirm your request. It will go to the doctor, who will review it and contact you.",
    flowTitle: "How does booking work?",
    formTitle: "Confirm your request",
    noteLabel: "Note for the doctor",
    noteHint: "For example, the best time to contact you. Please don't include health or other sensitive personal information.",
    submit: "Confirm booking",
    pending: "Sending your request…",
    phoneTipBefore: "Add your phone number on your",
    phoneTipAfter: " page so the doctor can reach you faster.",
    requestedOn: "Requested on",
    yourNote: "Your note",
    failures: {
      duplicate: "You already have an open request for this course.",
      rate_limited: "You've reached today's limit for booking requests. Please try again tomorrow.",
      unavailable: "This course isn't open for booking at the moment.",
    },
  },
};

/** A status's badge tone, label and explanation. The dashboard uses the Arabic default. */
export function bookingStatus(status: BookingStatus, locale: Locale = defaultLocale) {
  return { tone: statusTones[status], ...bookingCopy[locale].statuses[status] };
}
