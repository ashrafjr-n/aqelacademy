import qabaLogo from "@/assets/images/courses/qaba.jpg";
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

/** Every course card shows the QABA credentialing board's logo. */
const courseImages: Record<Locale, Course["image"]> = {
  ar: { src: qabaLogo, alt: "شعار مجلس QABA" },
  en: { src: qabaLogo, alt: "QABA logo" },
};

/** Facts that don't change with the language. */
const abat = { slug: "abat", priceUsd: 300, durationWeeks: 10, trainingHours: 40, level: "all" } satisfies Partial<Course>;
const qaspS = { slug: "qasp-s", priceUsd: 600, trainingHours: 180, level: "intermediate" } satisfies Partial<Course>;
const qba = { slug: "qba", priceUsd: 900, trainingHours: 270, level: "advanced" } satisfies Partial<Course>;

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
        "دورة تدريبية مهمة ومطلوبة في مجال تحليل السلوك التطبيقي (ABA)، وهي من أكثر الدورات طلبًا في سوق العمل.",
      image: courseImages.ar,
      instructor: instructors.ar,
      body: [
        {
          type: "paragraph",
          text: "أهلًا بك! دورة فني تحليل السلوك التطبيقي (Applied Behavior Analysis Technician – ABAT) دورة تدريبية مهمة ومطلوبة في مجال تحليل السلوك التطبيقي (ABA)، وهي من أكثر الدورات طلبًا في سوق العمل، وتشترطها كثير من المراكز والمدارس العاملة مع ذوي الإعاقة، خصوصًا في اضطراب طيف التوحد والاضطرابات السلوكية والانفعالية.",
        },
        { type: "heading", level: 2, text: "ما هي شهادة ABAT؟" },
        {
          type: "paragraph",
          text: "شهادة فني تحليل السلوك التطبيقي (ABAT) تُمنح للممارس الذي ينفّذ خدمات تحليل السلوك. ويعمل حاملها تحت إشراف محلل سلوك مؤهل (QBA) أو ما يعادله، ويتعامل بشكل مباشر مع الأفراد، وخاصةً المصابين باضطراب طيف التوحد والاضطرابات النمائية الأخرى.",
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
        { type: "heading", level: 2, text: "متطلبات الحصول على شهادة ABAT" },
        {
          type: "paragraph",
          text: "الحصول على الشهادة يتطلب عادةً أكثر من مجرد إكمال الدورة، وتشمل المتطلبات الرئيسية (وفقًا لمعايير QABA):",
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
          text: "نوفّر لك كل ذلك في هذه الدورة بأسعار تشجيعية. إذا كنت مهتمًا بالتسجيل في هذه الدورة، **تواصل معنا فالمقاعد محدودة**.",
        },
      ],
    },
    {
      ...qaspS,
      title: "دورة ممارس خدمات التوحد المؤهل – مشرف QASP-S",
      excerpt: "دورة متقدمة تؤهلك للإشراف على برامج تحليل السلوك التطبيقي وخدمات التوحد، وتغطي متطلبات الدراسة لشهادة QASP-S من مجلس QABA.",
      image: courseImages.ar,
      instructor: instructors.ar,
      body: [
        {
          type: "paragraph",
          text: "دورة ممارس خدمات التوحد المؤهل – مشرف (Qualified Autism Services Practitioner-Supervisor – QASP-S) موجّهة لحملة البكالوريوس الذين يريدون الانتقال من التطبيق المباشر إلى الإشراف على برامج تحليل السلوك التطبيقي (ABA) وتطويرها، خصوصًا في خدمات اضطراب طيف التوحد.",
        },
        { type: "heading", level: 2, text: "ما هي شهادة QASP-S؟" },
        {
          type: "paragraph",
          text: "شهادة QASP-S يمنحها مجلس اعتماد تحليل السلوك التطبيقي المؤهل (QABA) للممارسين الذين يشرفون على تقديم خدمات تحليل السلوك، ويطوّرون البرامج العلاجية، ويدرّبون الفنيين (ABAT) ويتابعون عملهم. ويعمل حامل الشهادة تحت إشراف محلل سلوك مؤهل (QBA) أو ما يعادله.",
        },
        { type: "heading", level: 2, text: "محتوى الدورة الأساسي (180 ساعة تدريبية)" },
        {
          type: "paragraph",
          text: "تغطي الدورة متطلبات الدراسة التي يحددها مجلس QABA لهذه الشهادة، وتشمل محاور رئيسية مثل:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "المبادئ والمفاهيم الأساسية لتحليل السلوك التطبيقي (ABA).",
            "المعرفة الأساسية حول اضطراب طيف التوحد (15 ساعة على الأقل).",
            "القياس وجمع البيانات وتحليلها واتخاذ القرارات بناءً عليها.",
            "تقييم السلوك الوظيفي وتقييم المهارات.",
            "تصميم الخطط العلاجية، واستراتيجيات اكتساب المهارات وخفض السلوكيات غير المرغوبة.",
            "الإشراف على الفنيين وتدريب الكوادر وأولياء الأمور.",
            "الأخلاقيات المهنية والاعتبارات القانونية (20 ساعة على الأقل).",
          ],
        },
        { type: "heading", level: 2, text: "متطلبات الحصول على شهادة QASP-S" },
        { type: "paragraph", text: "تشمل المتطلبات الرئيسية وفقًا لمعايير QABA:" },
        {
          type: "list",
          ordered: true,
          items: [
            "الحصول على درجة البكالوريوس على الأقل من جامعة معتمدة.",
            "إكمال 180 ساعة دراسية معتمدة في تحليل السلوك التطبيقي.",
            "إكمال 1000 ساعة من الخبرة الميدانية تحت الإشراف، منها 600 ساعة على الأقل في الإشراف أو تطوير البرامج.",
            "تقديم توصية مهنية من المشرف، وفحص السجل الجنائي (أو إقرار من جهة العمل).",
            "اجتياز اختبار البورد (QABA) والالتزام بميثاق أخلاقيات المجلس.",
          ],
        },
        {
          type: "paragraph",
          text: "تساعدك هذه الدورة على استكمال متطلبات الدراسة والاستعداد للاختبار. إذا كنت مهتمًا بالتسجيل في هذه الدورة، **تواصل معنا فالمقاعد محدودة**.",
        },
      ],
    },
    {
      ...qba,
      title: "دورة محلل سلوك مؤهل QBA",
      excerpt: "دورة متقدمة لحملة الماجستير تؤهلك لتقييم السلوك وتصميم البرامج العلاجية والإشراف على فرق تحليل السلوك التطبيقي، وتغطي متطلبات الدراسة لشهادة QBA من مجلس QABA.",
      image: courseImages.ar,
      instructor: instructors.ar,
      body: [
        {
          type: "paragraph",
          text: "دورة محلل السلوك المؤهل (Qualified Behavior Analyst – QBA) موجّهة لحملة الماجستير الذين يريدون العمل محللي سلوك: يقيّمون السلوك، ويصممون البرامج العلاجية، ويشرفون على الفرق العاملة في مجال تحليل السلوك التطبيقي (ABA).",
        },
        { type: "heading", level: 2, text: "ما هي شهادة QBA؟" },
        {
          type: "paragraph",
          text: "شهادة QBA هي شهادة مجلس اعتماد تحليل السلوك التطبيقي المؤهل (QABA) لمحللي السلوك. يُجري حامل الشهادة تقييمات السلوك، ويضع الخطط العلاجية ويتابع تنفيذها، ويشرف على ممارسي QASP-S والفنيين (ABAT).",
        },
        { type: "heading", level: 2, text: "محتوى الدورة الأساسي (270 ساعة تدريبية)" },
        {
          type: "paragraph",
          text: "تغطي الدورة متطلبات الدراسة التي يحددها مجلس QABA لهذه الشهادة، وتشمل محاور رئيسية مثل:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "المفاهيم والمبادئ المتقدمة في تحليل السلوك التطبيقي (ABA).",
            "القياس وتصميم التجارب وتقييم فاعلية التدخلات.",
            "تقييم السلوك الوظيفي وتحليل وظائف السلوك.",
            "تصميم البرامج العلاجية وإجراءات تغيير السلوك.",
            "المعرفة الأساسية حول اضطراب طيف التوحد (20 ساعة على الأقل).",
            "الإشراف وإدارة الفرق وتدريب الكوادر (20 ساعة على الأقل).",
            "الأخلاقيات المهنية والاعتبارات القانونية (20 ساعة على الأقل).",
          ],
        },
        { type: "heading", level: 2, text: "متطلبات الحصول على شهادة QBA" },
        { type: "paragraph", text: "تشمل المتطلبات الرئيسية وفقًا لمعايير QABA:" },
        {
          type: "list",
          ordered: true,
          items: [
            "الحصول على درجة الماجستير على الأقل من جامعة معتمدة في تخصص ذي صلة، مثل تحليل السلوك التطبيقي أو علم النفس أو التربية الخاصة.",
            "إكمال 270 ساعة دراسية معتمدة.",
            "إكمال 2000 ساعة من الخبرة الميدانية تحت الإشراف، منها 1200 ساعة على الأقل في المهام غير المباشرة، مثل الإشراف وتقييم السلوك ومراجعة البيانات.",
            "تقديم توصية مهنية من المشرف، وفحص السجل الجنائي (أو إقرار من جهة العمل).",
            "اجتياز اختبار البورد (QABA) والالتزام بميثاق أخلاقيات المجلس.",
          ],
        },
        {
          type: "paragraph",
          text: "تساعدك هذه الدورة على استكمال متطلبات الدراسة والاستعداد للاختبار. إذا كنت مهتمًا بالتسجيل في هذه الدورة، **تواصل معنا فالمقاعد محدودة**.",
        },
      ],
    },
  ],
  en: [
    {
      ...abat,
      title: "Applied Behavior Analysis Technician (ABAT) course",
      excerpt: "An essential, in-demand course in Applied Behaviour Analysis (ABA), and one of the qualifications employers ask for most.",
      image: courseImages.en,
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
    {
      ...qaspS,
      title: "Qualified Autism Services Practitioner-Supervisor (QASP-S) course",
      excerpt: "An advanced course that prepares you to supervise ABA and autism services, covering the QABA coursework requirements for the QASP-S credential.",
      image: courseImages.en,
      instructor: instructors.en,
      body: [
        {
          type: "paragraph",
          text: "The Qualified Autism Services Practitioner-Supervisor (QASP-S) course is for graduates who want to move from direct practice into supervising and developing Applied Behaviour Analysis (ABA) programmes, especially in autism services.",
        },
        { type: "heading", level: 2, text: "What is the QASP-S credential?" },
        {
          type: "paragraph",
          text: "The QASP-S credential is awarded by the Qualified Applied Behavior Analysis Credentialing Board (QABA) to practitioners who oversee behaviour-analytic services, develop treatment programmes, and train and supervise technicians (ABATs). A QASP-S works under the supervision of a Qualified Behavior Analyst (QBA) or equivalent.",
        },
        { type: "heading", level: 2, text: "Core course content (180 training hours)" },
        {
          type: "paragraph",
          text: "The course covers the coursework QABA requires for this credential. The main topics are:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "The core principles and concepts of Applied Behaviour Analysis (ABA).",
            "Autism core knowledge (at least 15 hours).",
            "Measurement, data collection and analysis, and data-based decision making.",
            "Functional behaviour assessment and skills assessment.",
            "Treatment planning, skill acquisition, and strategies to reduce behaviour that challenges.",
            "Supervising technicians, and training staff and parents.",
            "Ethical and legal considerations (at least 20 hours).",
          ],
        },
        { type: "heading", level: 2, text: "Requirements for the QASP-S credential" },
        { type: "paragraph", text: "Under QABA standards, the main requirements are:" },
        {
          type: "list",
          ordered: true,
          items: [
            "Hold at least a bachelor's degree from an accredited university.",
            "Complete 180 hours of approved ABA coursework.",
            "Complete 1,000 hours of supervised fieldwork, including at least 600 hours supervising or developing programmes.",
            "Provide a professional recommendation from your supervisor, and a criminal background check (or an employer attestation).",
            "Pass the QABA examination and agree to the QABA Code of Ethics.",
          ],
        },
        {
          type: "paragraph",
          text: "This course helps you complete the coursework and prepare for the exam. If you would like to enrol, **contact us soon, as places are limited**.",
        },
      ],
    },
    {
      ...qba,
      title: "Qualified Behavior Analyst (QBA) course",
      excerpt: "An advanced course for master's graduates that prepares you to assess behaviour, design treatment programmes and supervise ABA teams, covering the QABA coursework requirements for the QBA credential.",
      image: courseImages.en,
      instructor: instructors.en,
      body: [
        {
          type: "paragraph",
          text: "The Qualified Behavior Analyst (QBA) course is for master's graduates who want to work as behaviour analysts: assessing behaviour, designing treatment programmes and supervising teams in Applied Behaviour Analysis (ABA).",
        },
        { type: "heading", level: 2, text: "What is the QBA credential?" },
        {
          type: "paragraph",
          text: "The QBA is the behaviour analyst credential of the Qualified Applied Behavior Analysis Credentialing Board (QABA). A QBA carries out behaviour assessments, writes and oversees treatment plans, and supervises QASP-S practitioners and technicians (ABATs).",
        },
        { type: "heading", level: 2, text: "Core course content (270 training hours)" },
        {
          type: "paragraph",
          text: "The course covers the coursework QABA requires for this credential. The main topics are:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Advanced concepts and principles of Applied Behaviour Analysis (ABA).",
            "Measurement, experimental design and evaluating interventions.",
            "Functional behaviour assessment and the functions of behaviour.",
            "Treatment planning and behaviour-change procedures.",
            "Autism core knowledge (at least 20 hours).",
            "Supervision, team management and staff training (at least 20 hours).",
            "Ethical and legal considerations (at least 20 hours).",
          ],
        },
        { type: "heading", level: 2, text: "Requirements for the QBA credential" },
        { type: "paragraph", text: "Under QABA standards, the main requirements are:" },
        {
          type: "list",
          ordered: true,
          items: [
            "Hold at least a master's degree from an accredited university in a related field, such as ABA, psychology or special education.",
            "Complete 270 hours of approved coursework.",
            "Complete 2,000 hours of supervised fieldwork, including at least 1,200 indirect hours, such as supervision, behaviour assessment and reviewing data.",
            "Provide a professional recommendation from your supervisor, and a criminal background check (or an employer attestation).",
            "Pass the QABA examination and agree to the QABA Code of Ethics.",
          ],
        },
        {
          type: "paragraph",
          text: "This course helps you complete the coursework and prepare for the exam. If you would like to enrol, **contact us soon, as places are limited**.",
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
  { listTitle: string; listIntro: string; details: string; empty: string; trainer: string; duration: string; hours: string; level: string; whatsappQuestion: string; whatsappPrefill: (title: string) => string }
> = {
  ar: {
    listTitle: "الدورات التدريبية",
    listIntro:
      "تم تصميم كافة برامجنا التدريبية وتقديمها من قبل خبراء في تحليل السلوك التطبيقي، والتربية الخاصة، والتأهيل، وعلم النفس، استنادًا إلى أحدث الأبحاث، وبشهادات معتمدة دوليًا.",
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
    listIntro:
      "All our training programmes are designed and delivered by experts in Applied Behaviour Analysis, special education, rehabilitation and psychology, based on the latest research, with internationally recognised certificates.",
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
