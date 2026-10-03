import drTeaching from "@/assets/images/dr-muaffaq-teaching.jpg";
import hero from "@/assets/images/hero.jpg";
import qabaCourseworkProvider from "@/assets/images/qaba-coursework-provider.jpg";
import qabaTrainingProgram from "@/assets/images/qaba-training-program.jpg";
import type { ContentImage, NavLink } from "@/types/content";

export const homeHero = {
  title: "أكاديمية الدكتور موفق عقل لتحليل السلوك التطبيقي والتأهيل",
  text: "نقدّم برامج تدريب احترافية في مجالات تحليل السلوك التطبيقي (ABA)، التربية الخاصة، والتأهيل النفسي والسلوكي، بإشراف مباشر من الدكتور موفق عقل – الحاصل على البورد الأمريكي في تحليل السلوك التطبيقي.",
  image: { src: hero, alt: "" } satisfies ContentImage,
  primaryAction: { href: "/courses", label: "استعرض الدورات" } satisfies NavLink,
  secondaryAction: { href: "/contact-us", label: "تواصل معنا" } satisfies NavLink,
};

export const accreditations: ContentImage[] = [
  { src: qabaTrainingProgram, alt: "QABA Approved Training Program" },
  { src: qabaCourseworkProvider, alt: "QABA Approved Coursework Provider" },
];

export const featuredCoursesSection = {
  title: "الدورات المميزة",
  subtitle: "أبرز الدورات التدريبية",
  action: { href: "/courses", label: "جميع الدورات" } satisfies NavLink,
};

export const latestArticlesSection = {
  title: "آخر المقالات",
  action: { href: "/blog", label: "جميع المقالات" } satisfies NavLink,
};

export const journeySection = {
  title: "ابدأ رحلتك معنا",
  text: "سواء كنت معلمًا، أو أخصائيًا، أو ولي أمر يبحث عن المعرفة، ستجد في أكاديمية الدكتور موفق عقل التدريب والدعم الذي تحتاجه لتطوير مهاراتك وتحقيق أهدافك.",
  points: [
    "شهادات تدريب معتمدة",
    "تدريب عملي وتفاعلي",
    "إشراف مباشر من مختصين ذوي خبرة",
    "محتوى علمي محدث باستمرار",
  ],
  image: { src: drTeaching, alt: "الدكتور موفق عقل خلال إحدى الدورات التدريبية" } satisfies ContentImage,
  primaryAction: { href: "/courses", label: "سجّل الآن" } satisfies NavLink,
  secondaryAction: { href: "/contact-us", label: "اتصل بنا" } satisfies NavLink,
};
