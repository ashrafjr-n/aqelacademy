import type { Locale } from "@/lib/i18n";
import type { Faq } from "@/types/content";

const faqsAr: Faq[] = [
  {
    id: "what-is-academy",
    question: "ما هي أكاديمية الدكتور موفق عقل؟",
    answer:
      "هي منصة تدريبية تعليمية متخصصة في مجالات تحليل السلوك التطبيقي (ABA) والتربية الخاصة والتأهيل، يشرف عليها الدكتور موفق عقل الحاصل على البورد الأمريكي في تحليل السلوك التطبيقي، وتهدف إلى تأهيل الكوادر والمختصين وفق أحدث المعايير العالمية.",
  },
  {
    id: "online-or-onsite",
    question: "هل الدورات مقدّمة عبر الإنترنت أم حضوريًا؟",
    answer:
      "جميع الدورات تُقدّم عبر الإنترنت (أونلاين) بنظام تعلم تفاعلي يتيح للمتدربين حضور المحاضرات، والمشاركة في الأنشطة، واستلام الشهادات دون الحاجة للحضور الميداني.",
  },
  {
    id: "certificate",
    question: "هل يحصل المتدرب على شهادة بعد انتهاء الدورة؟",
    answer:
      "نعم، يحصل المتدرب على شهادة إتمام معتمدة من أكاديمية الدكتور موفق عقل بعد اجتياز متطلبات الدورة بنجاح.",
  },
  {
    id: "countries",
    question: "من أي بلد يمكنني التسجيل؟",
    answer:
      "الأكاديمية مفتوحة لجميع المتدربين في العالم العربي، ويمكن المشاركة في الدورات من أي مكان في العالم.",
  },
  {
    id: "prerequisites",
    question: "هل تتطلب الدورات خبرة أو تخصصًا مسبقًا؟",
    answer:
      "دورة فني تحليل السلوك التطبيقي (ABAT) تناسب المبتدئين، ويكفي للحصول على شهادتها مؤهل الثانوية العامة. أما شهادة QASP-S فتتطلب درجة البكالوريوس، وشهادة QBA تتطلب درجة الماجستير، وفق معايير مجلس QABA.",
  },
  {
    id: "contact",
    question: "كيف يمكنني التواصل مع إدارة الأكاديمية؟",
    answer: "يمكنك التواصل معنا في أي وقت عبر البريد الإلكتروني أو واتساب.",
    link: { href: "/contact-us", label: "معلومات التواصل" },
  },
];

const faqsEn: Faq[] = [
  {
    id: "what-is-academy",
    question: "What is Dr Muaffaq Aqel Academy?",
    answer:
      "It is a specialist training platform for Applied Behaviour Analysis (ABA), special education and rehabilitation. It is run by Dr Muaffaq Aqel, who holds US board certification in Applied Behaviour Analysis, and it trains professionals and specialists to the latest international standards.",
  },
  {
    id: "online-or-onsite",
    question: "Are the courses online or in person?",
    answer:
      "All our courses are delivered online through interactive learning. Trainees attend lectures, take part in activities and receive their certificates without needing to attend in person.",
  },
  {
    id: "certificate",
    question: "Do trainees receive a certificate at the end of the course?",
    answer:
      "Yes. Trainees receive an accredited certificate of completion from Dr Muaffaq Aqel Academy once they have successfully met the course requirements.",
  },
  {
    id: "countries",
    question: "Which countries can I register from?",
    answer: "The academy is open to trainees across the Arab world, and you can join our courses from anywhere in the world.",
  },
  {
    id: "prerequisites",
    question: "Do the courses need previous experience or a specialist background?",
    answer:
      "The Applied Behavior Analysis Technician (ABAT) course suits beginners: a high school diploma is enough for its credential. The QASP-S credential needs a bachelor's degree and the QBA a master's degree, under QABA standards.",
  },
  {
    id: "contact",
    question: "How can I contact the academy?",
    answer: "You can contact us at any time by email or WhatsApp.",
    link: { href: "/contact-us", label: "Contact details" },
  },
];

/** Links are locale-free; the page adds the /en prefix. */
export const faqContent: Record<Locale, { title: string; items: Faq[] }> = {
  ar: { title: "أسئلة شائعة", items: faqsAr },
  en: { title: "Frequently asked questions", items: faqsEn },
};
