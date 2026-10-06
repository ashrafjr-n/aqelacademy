import type { Locale } from "@/lib/i18n";

interface ContactContent {
  title: string;
  intro: { title: string; paragraphs: string[] };
  labels: { phone: string; whatsapp: string; whatsappValue: string; email: string; address: string };
}

export const contactContent: Record<Locale, ContactContent> = {
  ar: {
    title: "اتصل بنا",
    intro: {
      title: "نحن هنا لمساعدتك",
      paragraphs: [
        "مرحبًا بك في أكاديمية الدكتور موفق عقل، يسعدنا تواصلك معنا للإجابة على استفساراتك المتعلقة بالدورات، التسجيل، أو الدعم الفني.",
        "فريقنا جاهز دائمًا لتقديم المساعدة وتوجيهك نحو المسار التدريبي الأنسب لك.",
      ],
    },
    labels: { phone: "رقم الهاتف", whatsapp: "واتساب", whatsappValue: "راسلنا مباشرة", email: "البريد الإلكتروني", address: "العنوان" },
  },
  en: {
    title: "Contact us",
    intro: {
      title: "We're here to help",
      paragraphs: [
        "Welcome to Dr Muaffaq Aqel Academy. We're happy to answer your questions about our courses, registration or technical support.",
        "Our team is always ready to help and to guide you towards the training path that suits you best.",
      ],
    },
    labels: { phone: "Phone", whatsapp: "WhatsApp", whatsappValue: "Message us directly", email: "Email", address: "Address" },
  },
};
