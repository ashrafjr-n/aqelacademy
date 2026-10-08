import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { PolicySection } from "@/types/content";

/** Shared by both languages; bump it when either text changes. */
export const refundPolicyUpdatedAt = "2026-10-07";

interface RefundPolicy {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: PolicySection[];
}

/** One card per section, on the home page and on `/refund-policy`. */
export const refundPolicy: Record<Locale, RefundPolicy> = {
  ar: {
    title: "سياسة الاسترجاع والاسترداد المالي",
    lastUpdated: "آخر تحديث:",
    intro: `تحرص ${site.name} على تقديم تجربة تدريبية متميزة وشفافة، وعلى توضيح آلية الاسترجاع والاسترداد المالي وفق البنود التالية.`,
    sections: [
      {
        title: "أولًا: الدورات التدريبية المباشرة (الحضورية أو الافتراضية المباشرة)",
        items: [
          "يحق للمتدرب طلب استرداد الرسوم كاملة خلال 48 ساعة من إتمام التسجيل، بشرط عدم حضور أي جلسة تدريبية أو الحصول على المواد التعليمية.",
          "في حال إلغاء التسجيل بعد انتهاء فترة الـ48 ساعة وقبل بدء البرنامج، يُخصم 10% من قيمة الرسوم كرسوم إدارية، ويُسترد المبلغ المتبقي.",
          "بعد بدء البرنامج التدريبي أو حضور الجلسة الأولى، لا يحق للمتدرب المطالبة باسترداد الرسوم المدفوعة.",
        ],
      },
      {
        title: "ثانيًا: البرامج المسجّلة مسبقًا (Recorded Courses)",
        items: [
          "نظرًا لإمكانية الوصول الفوري إلى المحتوى الرقمي، لا يمكن استرداد الرسوم بعد تفعيل حساب المتدرب أو الوصول إلى المواد التعليمية.",
          "في حال وجود مشكلة تقنية تمنع الوصول إلى المحتوى، تلتزم الأكاديمية بمعالجة المشكلة أو توفير بديل مناسب.",
        ],
      },
      {
        title: "ثالثًا: الإشراف المهني والخدمات الاستشارية",
        items: [
          "يمكن إلغاء جلسات الإشراف أو الاستشارات قبل موعدها بـ48 ساعة على الأقل، مع إعادة جدولة الجلسة أو استرداد المبلغ.",
          "في حال الإلغاء قبل أقل من 48 ساعة من موعد الجلسة، تُعدّ الجلسة منفّذة ولا يحق استرداد رسومها.",
        ],
      },
      {
        title: "رابعًا: إلغاء البرامج من قبل الأكاديمية",
        text: "تحتفظ الأكاديمية بحق إلغاء أو تأجيل أي برنامج تدريبي في حال عدم اكتمال العدد أو وجود ظروف طارئة. وفي هذه الحالة يحق للمتدرب الاختيار بين:",
        items: ["استرداد كامل المبلغ المدفوع.", "تحويل المبلغ إلى برنامج تدريبي آخر.", "الاحتفاظ بالمبلغ رصيدًا ماليًا للاستخدام المستقبلي."],
      },
      {
        title: "خامسًا: آلية الاسترداد",
        items: [
          `تُقدَّم طلبات الاسترداد عبر البريد الإلكتروني الرسمي للأكاديمية: **${site.contact.email}**.`,
          "تتم مراجعة الطلب خلال 5 أيام عمل.",
          "يُحوَّل المبلغ المستحق خلال مدة لا تتجاوز 14 يوم عمل من تاريخ الموافقة على الطلب.",
        ],
      },
      {
        title: "سادسًا: الموافقة على السياسة",
        text: "يُعدّ إتمام التسجيل وسداد الرسوم موافقةً صريحةً من المتدرب على جميع البنود الواردة في هذه السياسة.",
      },
    ],
  },
  en: {
    title: "Refund policy",
    lastUpdated: "Last updated:",
    intro: "Dr Muaffaq Aqel Academy is committed to an excellent, transparent training experience. This policy explains how cancellations and refunds work.",
    sections: [
      {
        title: "1) Live courses (in person or live online)",
        items: [
          "You may ask for a full refund within 48 hours of completing your registration, as long as you have not attended any session or received any course materials.",
          "If you cancel after those 48 hours but before the programme starts, 10% of the fee is kept as an administrative charge and the rest is refunded.",
          "Once the programme has started, or you have attended the first session, the fees you have paid are not refundable.",
        ],
      },
      {
        title: "2) Recorded courses",
        items: [
          "Because the digital content is available straight away, fees cannot be refunded once your account has been activated or you have accessed the course materials.",
          "If a technical problem stops you accessing the content, the academy will fix it or offer a suitable alternative.",
        ],
      },
      {
        title: "3) Professional supervision and consultations",
        items: [
          "You may cancel a supervision or consultation session at least 48 hours before it starts, and either reschedule it or get a refund.",
          "If you cancel less than 48 hours before the session, it counts as delivered and its fee is not refundable.",
        ],
      },
      {
        title: "4) Programmes cancelled by the academy",
        text: "The academy may cancel or postpone any training programme if not enough people have enrolled or in an emergency. In that case, you can choose to:",
        items: ["Get a full refund.", "Move the amount to another training programme.", "Keep the amount as credit for future use."],
      },
      {
        title: "5) How to ask for a refund",
        items: [
          `Email your refund request to the academy's official address: **${site.contact.email}**.`,
          "We review requests within 5 working days.",
          "Any amount due is transferred within 14 working days of your request being approved.",
        ],
      },
      {
        title: "6) Agreeing to this policy",
        text: "By completing your registration and paying the fees, you expressly agree to all the terms of this policy.",
      },
    ],
  },
};
