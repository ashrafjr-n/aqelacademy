import drTeaching from "@/assets/images/dr-muaffaq-teaching.jpg";
import hero from "@/assets/images/hero.jpg";
import qabaCourseworkProvider from "@/assets/images/qaba-coursework-provider.jpg";
import qabaTrainingProgram from "@/assets/images/qaba-training-program.jpg";
import type { Locale } from "@/lib/i18n";
import type { ContentImage, NavLink } from "@/types/content";

/** The badges carry QABA's own wording, so their alt text stays as printed in both languages. */
const accreditations: ContentImage[] = [
  { src: qabaTrainingProgram, alt: "QABA Approved Training Program" },
  { src: qabaCourseworkProvider, alt: "QABA Approved Coursework Provider" },
];

interface HomeContent {
  hero: { eyebrow: string; title: string; text: string; image: ContentImage; primaryAction: NavLink; secondaryAction: NavLink };
  accreditationsTitle: string;
  accreditations: ContentImage[];
  featuredCourses: { title: string; subtitle: string; action: NavLink };
  latestArticles: { title: string; action: NavLink };
  journey: { title: string; text: string; points: string[]; image: ContentImage; primaryAction: NavLink; secondaryAction: NavLink };
  cta: { title: string; text: string; primaryAction: NavLink; secondaryAction: NavLink };
}

/** Hrefs are locale-free; the page adds the /en prefix. */
export const homeContent: Record<Locale, HomeContent> = {
  ar: {
    hero: {
      eyebrow: "برامج تدريبية معتمدة من QABA",
      title: "أكاديمية الدكتور موفق عقل لتحليل السلوك التطبيقي والتأهيل",
      text: "نقدّم برامج تدريب احترافية في مجالات تحليل السلوك التطبيقي (ABA)، التربية الخاصة، والتأهيل النفسي والسلوكي، بإشراف مباشر من الدكتور موفق عقل – الحاصل على البورد الأمريكي في تحليل السلوك التطبيقي.",
      image: { src: hero, alt: "" },
      primaryAction: { href: "/courses", label: "استعرض الدورات" },
      secondaryAction: { href: "/contact-us", label: "تواصل معنا" },
    },
    accreditationsTitle: "معتمدون من",
    accreditations,
    featuredCourses: {
      title: "الدورات المميزة",
      subtitle: "أبرز الدورات التدريبية",
      action: { href: "/courses", label: "جميع الدورات" },
    },
    latestArticles: {
      title: "آخر المقالات",
      action: { href: "/blog", label: "جميع المقالات" },
    },
    journey: {
      title: "ابدأ رحلتك معنا",
      text: "سواء كنت معلمًا، أو أخصائيًا، أو ولي أمر يبحث عن المعرفة، ستجد في أكاديمية الدكتور موفق عقل التدريب والدعم الذي تحتاجه لتطوير مهاراتك وتحقيق أهدافك.",
      points: ["شهادات تدريب معتمدة", "تدريب عملي وتفاعلي", "إشراف مباشر من مختصين ذوي خبرة", "محتوى علمي محدث باستمرار"],
      image: { src: drTeaching, alt: "الدكتور موفق عقل خلال إحدى الدورات التدريبية" },
      primaryAction: { href: "/courses", label: "سجّل الآن" },
      secondaryAction: { href: "/contact-us", label: "اتصل بنا" },
    },
    cta: {
      title: "هل أنت مستعد لبدء رحلتك التدريبية؟",
      text: "أنشئ حسابك واحجز مقعدك في الدورة، وسيتواصل معك الدكتور لترتيب التفاصيل.",
      primaryAction: { href: "/register", label: "أنشئ حسابك" },
      secondaryAction: { href: "/courses", label: "استعرض الدورات" },
    },
  },
  en: {
    hero: {
      eyebrow: "QABA-approved training programmes",
      title: "Dr Muaffaq Aqel Academy for Applied Behaviour Analysis and Rehabilitation",
      text: "We offer professional training in Applied Behaviour Analysis (ABA), special education, and psychological and behavioural rehabilitation, supervised directly by Dr Muaffaq Aqel, who holds US board certification in Applied Behaviour Analysis.",
      image: { src: hero, alt: "" },
      primaryAction: { href: "/courses", label: "Browse courses" },
      secondaryAction: { href: "/contact-us", label: "Contact us" },
    },
    accreditationsTitle: "Approved by",
    accreditations,
    featuredCourses: {
      title: "Featured courses",
      subtitle: "Our main training courses",
      action: { href: "/courses", label: "All courses" },
    },
    latestArticles: {
      title: "Latest articles",
      action: { href: "/blog", label: "All articles" },
    },
    journey: {
      title: "Start your journey with us",
      text: "Whether you are a teacher, a specialist or a parent who wants to learn more, Dr Muaffaq Aqel Academy gives you the training and support you need to build your skills and reach your goals.",
      points: ["Accredited training certificates", "Practical, interactive training", "Direct supervision by experienced specialists", "Evidence-based content, kept up to date"],
      image: { src: drTeaching, alt: "Dr Muaffaq Aqel teaching a training course" },
      primaryAction: { href: "/courses", label: "Enrol now" },
      secondaryAction: { href: "/contact-us", label: "Contact us" },
    },
    cta: {
      title: "Ready to start your training?",
      text: "Create an account and book your place on a course. Dr Aqel will then contact you to arrange the details.",
      primaryAction: { href: "/register", label: "Create an account" },
      secondaryAction: { href: "/courses", label: "Browse courses" },
    },
  },
};
