import type { Locale } from "@/lib/i18n";
import type { NavLink } from "@/types/content";

export type ConsultationAudienceId = "adults" | "children";

export interface ConsultationAudience {
  id: ConsultationAudienceId;
  title: string;
  /** A short line under the title, e.g. "with the parents". */
  note?: string;
  items: string[];
}

interface ConsultationsContent {
  title: string;
  heading: string;
  intro: string;
  offerTitle: string;
  audiences: ConsultationAudience[];
  featuresTitle: string;
  features: string[];
  cta: { title: string; text: string; button: string; whatsappPrefill: string };
  /** The home page section; the action is a locale-free path. */
  home: { title: string; action: NavLink };
}

/** Online psychological and behavioural consultations (`/consultations` and the home page section). Booked over WhatsApp. */
export const consultationsContent: Record<Locale, ConsultationsContent> = {
  ar: {
    title: "الاستشارات النفسية والسلوكية",
    heading: "خطوتك نحو التغيير الإيجابي تبدأ من مكانك",
    intro:
      "سواء كنت تبحث عن استعادة توازنك وإدارة ضغوط الحياة، أو تسعى لفهم طفلك وتعديل سلوكه بأساليب علمية مدروسة، نوفر لك استشارات تخصصية عبر الإنترنت تجمع بين السرية التامة والحلول التطبيقية الواقعية.",
    offerTitle: "ماذا نقدم؟",
    audiences: [
      {
        id: "adults",
        title: "للكبار",
        items: ["دعم الضغوط والقلق", "إدارة المشاعر", "بناء العادات الإيجابية", "تطوير مهارات الحياة والعمل"],
      },
      {
        id: "children",
        title: "للأطفال والمراهقين",
        note: "بالشراكة مع الوالدين",
        items: ["تعديل السلوكيات التحدّية", "خطط التواصل والتعزيز", "تنمية الاستقلالية", "توجيه أسري متكامل خطوة بخطوة"],
      },
    ],
    featuresTitle: "مميزات الجلسات",
    features: ["خصوصية وأمان كامل للبيانات", "خطط فردية قابلة للقياس والتطبيق", "مرونة في المواعيد من أي مكان"],
    cta: {
      title: "ابدأ الآن واحجز جلستك التقييمية",
      text: "راسلنا عبر واتساب لحجز جلستك التقييمية واختيار الموعد المناسب لك.",
      button: "احجز عبر واتساب",
      whatsappPrefill: "مرحبًا، أودّ حجز جلسة تقييمية للاستشارات النفسية والسلوكية.",
    },
    home: {
      title: "استشارات نفسية وسلوكية أونلاين",
      action: { href: "/consultations", label: "تفاصيل الاستشارات" },
    },
  },
  en: {
    title: "Psychological and behavioural consultations",
    heading: "Your step towards positive change starts where you are",
    intro:
      "Whether you want to regain your balance and manage the pressures of life, or understand your child and change their behaviour with proven scientific methods, we offer specialist online consultations that combine full confidentiality with practical, realistic solutions.",
    offerTitle: "What we offer",
    audiences: [
      {
        id: "adults",
        title: "For adults",
        items: ["Support with stress and anxiety", "Managing emotions", "Building positive habits", "Developing life and work skills"],
      },
      {
        id: "children",
        title: "For children and teenagers",
        note: "In partnership with parents",
        items: ["Changing challenging behaviour", "Communication and reinforcement plans", "Building independence", "Step-by-step guidance for the whole family"],
      },
    ],
    featuresTitle: "Why our sessions",
    features: ["Full privacy and data security", "Individual plans you can measure and apply", "Flexible times, from anywhere"],
    cta: {
      title: "Start now and book your assessment session",
      text: "Message us on WhatsApp to book your assessment session and choose a time that suits you.",
      button: "Book on WhatsApp",
      whatsappPrefill: "Hello, I would like to book an assessment session for psychological and behavioural consultations.",
    },
    home: {
      title: "Online psychological and behavioural consultations",
      action: { href: "/consultations", label: "Consultation details" },
    },
  },
};
