import drPortrait from "@/assets/images/dr-muaffaq-portrait.jpg";
import drTeaching from "@/assets/images/dr-muaffaq-teaching.jpg";
import type { Locale } from "@/lib/i18n";
import type { ContentImage, TitledText } from "@/types/content";

interface TitledParagraphs {
  title: string;
  paragraphs: string[];
}

interface AboutContent {
  title: string;
  vision: TitledParagraphs & { image: ContentImage };
  academy: TitledParagraphs & { programs: string[]; image: ContentImage };
  whyUs: { title: string; points: string[] };
  mission: TitledParagraphs;
  values: { title: string; items: TitledText[] };
}

export const aboutContent: Record<Locale, AboutContent> = {
  ar: {
    title: "من نحن",
    vision: {
      title: "رؤيتنا",
      paragraphs: [
        "نهدف في أكاديمية الدكتور موفق عقل لتحليل السلوك التطبيقي والتأهيل إلى أن نكون منارة علمية عربية متخصصة في تأهيل وتطوير الكوادر العاملة في مجالات التربية الخاصة، التحليل السلوكي التطبيقي (ABA)، والعلاج النفسي والسلوكي لذوي الاحتياجات الخاصة.",
        "نؤمن أن التعليم المتخصص هو حجر الأساس في بناء بيئة داعمة وشاملة لكل فرد في المجتمع.",
      ],
      image: { src: drTeaching, alt: "الدكتور موفق عقل خلال إحدى الدورات التدريبية" },
    },
    academy: {
      title: "عن الأكاديمية",
      paragraphs: [
        "تأسست الأكاديمية على يد الدكتور موفق عقل، الذي يحمل البورد الأمريكي في تحليل السلوك التطبيقي (ABA)، ويُعد من المتخصصين البارزين في التربية الخاصة والتأهيل السلوكي في الوطن العربي.",
        "تقدّم الأكاديمية برامج تدريبية ودورات علمية وفق أحدث المناهج العالمية في:",
      ],
      programs: [
        "فني تحليل سلوك تطبيقي (ABAT)",
        "ممارس خدمات التوحد المؤهل – مشرف (QASP-S)",
        "محلل سلوك مؤهل (QBA)",
        "التوحد",
        "التربية الخاصة",
        "صعوبات التعلم",
        "العلاج المعرفي السلوكي (CBT)",
        "الدعم النفسي لذوي الاحتياجات الخاصة",
      ],
      image: { src: drPortrait, alt: "الدكتور موفق عقل" },
    },
    whyUs: {
      title: "لماذا تختارنا؟",
      points: [
        "إشراف مباشر من دكتور حاصل على البورد الأمريكي في تحليل السلوك التطبيقي (ABA)",
        "محتوى علمي مُحدَّث باستمرار",
        "تدريب عملي وتطبيقي بأسلوب تفاعلي",
        "شهادات معتمدة ومجالات تطبيق واسعة",
      ],
    },
    mission: {
      title: "رسالتنا",
      paragraphs: [
        "أن نُمكّن الأخصائيين، المربين، وأولياء الأمور بالعلم والمعرفة والمهارة، ليصبحوا قادرين على إحداث فرق حقيقي في حياة الأفراد ذوي الاحتياجات الخاصة.",
        "نؤمن أن التدريب المبني على العلم والخبرة هو الطريق نحو مستقبل أفضل وأكثر وعيًا.",
      ],
    },
    values: {
      title: "قيمنا",
      items: [
        { title: "الاحترافية", text: "تقديم محتوى تدريبي عالي الجودة قائم على الأسس العلمية." },
        { title: "الإنسانية", text: "نضع الإنسان أولًا في كل خطوة نخطوها." },
        { title: "التميز", text: "نسعى دائمًا لتقديم الأفضل علميًا ومهنيًا." },
        { title: "التمكين", text: "نؤمن بقدرة المتدربين على أن يصبحوا قادة في مجالاتهم." },
      ],
    },
  },
  en: {
    title: "About us",
    vision: {
      title: "Our vision",
      paragraphs: [
        "At Dr Muaffaq Aqel Academy for Applied Behaviour Analysis and Rehabilitation, we aim to be a leading centre of learning in the Arab world for training and developing professionals in special education, Applied Behaviour Analysis (ABA), and psychological and behavioural therapy for people with special needs.",
        "We believe that specialist education is the foundation of a supportive, inclusive environment for everyone in society.",
      ],
      image: { src: drTeaching, alt: "Dr Muaffaq Aqel teaching a training course" },
    },
    academy: {
      title: "About the academy",
      paragraphs: [
        "The academy was founded by Dr Muaffaq Aqel, who holds US board certification in Applied Behaviour Analysis (ABA) and is one of the leading specialists in special education and behavioural rehabilitation in the Arab world.",
        "The academy offers training programmes and courses based on the latest international curricula in:",
      ],
      programs: [
        "Applied Behavior Analysis Technician (ABAT)",
        "Qualified Autism Services Practitioner-Supervisor (QASP-S)",
        "Qualified Behavior Analyst (QBA)",
        "Autism",
        "Special education",
        "Specific learning difficulties",
        "Cognitive behavioural therapy (CBT)",
        "Psychological support for people with special needs",
      ],
      image: { src: drPortrait, alt: "Dr Muaffaq Aqel" },
    },
    whyUs: {
      title: "Why choose us?",
      points: [
        "Direct supervision by a US board-certified specialist in ABA",
        "Evidence-based content, kept up to date",
        "Practical, hands-on and interactive training",
        "Accredited certificates that are useful in many settings",
      ],
    },
    mission: {
      title: "Our mission",
      paragraphs: [
        "To give specialists, educators and parents the knowledge and skills to make a real difference in the lives of people with special needs.",
        "We believe that training built on science and experience is the path to a better, more informed future.",
      ],
    },
    values: {
      title: "Our values",
      items: [
        { title: "Professionalism", text: "High-quality training content built on scientific foundations." },
        { title: "Humanity", text: "People come first in everything we do." },
        { title: "Excellence", text: "We always aim to deliver the best, scientifically and professionally." },
        { title: "Empowerment", text: "We believe our trainees can become leaders in their fields." },
      ],
    },
  },
};
