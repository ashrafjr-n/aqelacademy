import abatImage from "@/assets/images/courses/abat.jpg";
import drPortrait from "@/assets/images/dr-muaffaq-portrait.jpg";
import { formatCount, formatEnglishCount } from "@/lib/format";
import { defaultLocale, type Locale } from "@/lib/i18n";
import type { Course, Instructor } from "@/types/content";

export const instructors: Record<Locale, Instructor> = {
  ar: {
    name: "د. موفق عقل",
    title: "حاصل على البورد الأمريكي في تحليل السلوك التطبيقي (ABA)",
    image: { src: drPortrait, alt: "الدكتور موفق عقل" },
  },
  en: {
    name: "Dr Muaffaq Aqel",
    title: "Holds US board certification in Applied Behaviour Analysis (ABA)",
    image: { src: drPortrait, alt: "Dr Muaffaq Aqel" },
  },
};

/** Facts that don't change with the language. */
const abat = { slug: "abat", priceUsd: 100, durationWeeks: 10, trainingHours: 40, level: "all" } satisfies Partial<Course>;

/**
 * Official credential and board names (Applied Behavior Analysis Technician, Qualified Behavior
 * Analyst, QABA) keep their US spelling in English; everything else is British.
 */
const coursesByLocale: Record<Locale, Course[]> = {
  ar: [
    {
      ...abat,
      title: "دورة فني تحليل سلوك تطبيقي دولي ABAT",
      excerpt:
        "دورة تدريبية هامة ومطلوبة في مجال تحليل السلوك التطبيقي (ABA)، وتعد من أكثر الدورات حاجة في سوق العمل.",
      image: { src: abatImage, alt: "تحليل السلوك التطبيقي ABA" },
      instructor: instructors.ar,
      body: [
        {
          type: "paragraph",
          text: "أهلاً بك! دورة فني تحليل السلوك التطبيقي (Applied Behavior Analysis Technician – ABAT) وهي دورة تدريبية هامة ومطلوبة في مجال تحليل السلوك التطبيقي (ABA)، وتعد من أكثر الدورات حاجة في سوق العمل ومتطلب للعديد من المراكز والمدارس في مجال ذوي الإعاقة، خصوصًا اضطراب طيف التوحد والاضطرابات السلوكية والانفعالية.",
        },
        { type: "heading", level: 2, text: "ما هي رخصة ABAT؟" },
        {
          type: "paragraph",
          text: "رخصة فني تحليل السلوك التطبيقي (ABAT) هي شهادة لممارس مسؤول عن تنفيذ خدمات تحليل السلوك. هذا الشخص يعمل تحت إشراف محلل سلوك مؤهل (QBA) أو ما يعادله، ويتعامل بشكل مباشر مع الأفراد، وخاصةً المصابين باضطراب طيف التوحد والاضطرابات النمائية الأخرى.",
        },
        { type: "heading", level: 2, text: "محتوى الدورة الأساسي (40 ساعة تدريبية)" },
        {
          type: "paragraph",
          text: "تغطي الدورة المتطلبات النظرية التي يحددها مجلس اعتماد تحليل السلوك التطبيقي المؤهل (QABA)، وتشمل محاور رئيسية مثل:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "مقدمة في التوحد والمفاهيم الأساسية له.",
            "المبادئ الأساسية لعلم تحليل السلوك التطبيقي (ABA).",
            "القياس وجمع البيانات وتحليلها ورسم الرسوم البيانية.",
            "تقييم السلوك والوظائف السلوكية.",
            "اكتساب المهارات (بناء المهارات) واستراتيجيات التدريس المختلفة.",
            "خفض المشاكل السلوكية (الحد من السلوكيات غير المرغوبة) والتدخلات السلوكية.",
            "التدخلات القبلية (استراتيجيات ما قبل السلوك).",
            "الاعتبارات القانونية والأخلاقية والسلوك المهني.",
          ],
        },
        { type: "heading", level: 2, text: "متطلبات الحصول على رخصة ABAT" },
        {
          type: "paragraph",
          text: "الحصول على الرخصة يتطلب عادةً أكثر من مجرد إكمال الدورة، وتشمل المتطلبات الرئيسية (وفقًا لمعايير QABA):",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "إكمال 40 ساعة تدريبية معتمدة.",
            "الحصول على مؤهل تعليمي لا يقل عن الثانوية العامة/الدبلوم أو ما يعادلها.",
            "إكمال متطلب تقييم الكفاءة (Competency Assessment)، وهو جزء عملي تحت الإشراف.",
            "اجتياز الاختبار الخاص بالبورد (QABA).",
            "إكمال ساعات الإشراف الميداني (قد تختلف المتطلبات وتفاصيلها حسب الجهة المانحة).",
          ],
        },
        {
          type: "paragraph",
          text: "كل ذلك سنوفره في هذه الدورة وبأسعار تشجيعية للجميع. إذا كنت مهتمًا بالتسجيل في هذه الدورة، **تواصل معنا فالمقاعد محدودة**.",
        },
      ],
    },
  ],
  en: [
    {
      ...abat,
      title: "Applied Behavior Analysis Technician (ABAT) course",
      excerpt: "An essential, in-demand course in Applied Behaviour Analysis (ABA), and one of the qualifications employers ask for most.",
      image: { src: abatImage, alt: "Applied Behaviour Analysis (ABA)" },
      instructor: instructors.en,
      body: [
        {
          type: "paragraph",
          text: "Welcome! The Applied Behavior Analysis Technician (ABAT) course is an essential, in-demand course in Applied Behaviour Analysis (ABA). It is one of the qualifications most needed in the job market, and many centres and schools that support disabled people require it, especially in autism spectrum disorder (ASD) and emotional and behavioural disorders.",
        },
        { type: "heading", level: 2, text: "What is the ABAT credential?" },
        {
          type: "paragraph",
          text: "The Applied Behavior Analysis Technician (ABAT) credential is for practitioners who deliver behaviour-analytic services. An ABAT works under the supervision of a Qualified Behavior Analyst (QBA) or equivalent, and works directly with clients, particularly people with autism spectrum disorder and other developmental disabilities.",
        },
        { type: "heading", level: 2, text: "Core course content (40 training hours)" },
        {
          type: "paragraph",
          text: "The course covers the coursework requirements set by the Qualified Applied Behavior Analysis Credentialing Board (QABA). The main topics are:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "An introduction to autism and its core concepts.",
            "The basic principles of Applied Behaviour Analysis (ABA).",
            "Measurement, data collection and analysis, and graphing.",
            "Behaviour assessment and the functions of behaviour.",
            "Skill acquisition and teaching strategies.",
            "Behaviour reduction (reducing behaviour that challenges) and behavioural interventions.",
            "Antecedent interventions (strategies used before the behaviour occurs).",
            "Ethical and legal considerations, and professional conduct.",
          ],
        },
        { type: "heading", level: 2, text: "Requirements for the ABAT credential" },
        {
          type: "paragraph",
          text: "Earning the credential usually takes more than completing the course. Under QABA standards, the main requirements are:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Complete 40 hours of approved training.",
            "Hold at least a high school diploma or equivalent.",
            "Pass the Competency Assessment, a supervised practical component.",
            "Pass the QABA examination.",
            "Complete the supervised fieldwork hours (the exact requirements can vary between awarding bodies).",
          ],
        },
        {
          type: "paragraph",
          text: "This course covers all of it, at an affordable price. If you would like to enrol, **contact us soon, as places are limited**.",
        },
      ],
    },
  ],
};

/** Every course slug; the same in both languages. */
export const courseSlugs = coursesByLocale[defaultLocale].map((course) => course.slug);

export function getCourses(locale: Locale): Course[] {
  return coursesByLocale[locale];
}

/** The dashboard, emails and notifications use the Arabic title, so the locale defaults to Arabic. */
export function getCourse(slug: string, locale: Locale = defaultLocale): Course | undefined {
  return coursesByLocale[locale].find((course) => course.slug === slug);
}

export function courseDurationLabel(weeks: number, locale: Locale): string {
  if (locale === "en") return formatEnglishCount(weeks, "week", "weeks");
  return formatCount(weeks, { one: "أسبوع واحد", two: "أسبوعان", few: "# أسابيع", many: "# أسبوعًا", other: "# أسبوع" });
}

export function courseHoursLabel(hours: number, locale: Locale): string {
  if (locale === "en") return formatEnglishCount(hours, "training hour", "training hours");
  return formatCount(hours, {
    one: "ساعة تدريبية واحدة",
    two: "ساعتان تدريبيتان",
    few: "# ساعات تدريبية",
    many: "# ساعة تدريبية",
    other: "# ساعة تدريبية",
  });
}

/** Labels around the courses (cards, the course page, its summary card). */
export const courseCopy: Record<
  Locale,
  { listTitle: string; details: string; empty: string; trainer: string; duration: string; hours: string; level: string; whatsappQuestion: string; whatsappPrefill: (title: string) => string }
> = {
  ar: {
    listTitle: "الدورات التدريبية",
    details: "التفاصيل والحجز",
    empty: "لا توجد دورات متاحة حاليًا.",
    trainer: "المدرب",
    duration: "المدة",
    hours: "عدد الساعات",
    level: "المستوى",
    whatsappQuestion: "لديك سؤال؟ تواصل معنا عبر واتساب",
    whatsappPrefill: (title) => `مرحبًا، لدي استفسار عن ${title}`,
  },
  en: {
    listTitle: "Courses",
    details: "Details and booking",
    empty: "No courses are available at the moment.",
    trainer: "Trainer",
    duration: "Duration",
    hours: "Training hours",
    level: "Level",
    whatsappQuestion: "Got a question? Message us on WhatsApp",
    whatsappPrefill: (title) => `Hello, I have a question about the ${title}`,
  },
};
