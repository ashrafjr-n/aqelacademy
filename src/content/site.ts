import logo from "@/assets/images/logo.png";
import type { Locale } from "@/lib/i18n";
import type { ContentImage, NavLink } from "@/types/content";

/** Locale-independent facts, plus the Arabic name and copy used by the dashboard and emails. Public pages read `siteText`. */
const name = "أكاديمية الدكتور موفق عقل";
const tagline = "لتحليل السلوك التطبيقي والتأهيل";

export const site = {
  name,
  tagline,
  fullName: `${name} ${tagline}`,
  description:
    "برامج تدريب احترافية في تحليل السلوك التطبيقي (ABA)، التربية الخاصة، والتأهيل النفسي والسلوكي، بإشراف مباشر من الدكتور موفق عقل.",
  url: "https://aqelacademy.com",
  logo: { src: logo, alt: "شعار أكاديمية الدكتور موفق عقل" } satisfies ContentImage,
  contact: {
    phone: "+96897192495",
    phoneDisplay: "0096897192495",
    whatsapp: "96897192495",
    email: "mouaffaq2007@yahoo.com",
    location: "عمّان، الأردن",
  },
} as const;

interface SiteText {
  name: string;
  tagline: string;
  fullName: string;
  description: string;
  location: string;
  logoAlt: string;
  /** Locale-free paths; components add the /en prefix with `localePath`. */
  nav: NavLink[];
  footerLinks: NavLink[];
  account: NavLink;
  chrome: {
    skipToContent: string;
    mainMenu: string;
    menu: string;
    breadcrumb: string;
    home: string;
    quickLinks: string;
    contactUs: string;
    rights: string;
    helpLinks: string;
    privacyPolicy: string;
    whatsapp: string;
    whatsappAria: string;
    /** The other language's name, on the language switch. */
    switchLanguage: string;
    notFoundTitle: string;
    notFoundText: string;
    backHome: string;
    errorTitle: string;
    errorText: string;
    retry: string;
    loading: string;
  };
}

const englishName = "Dr Muaffaq Aqel Academy";
const englishTagline = "for Applied Behaviour Analysis and Rehabilitation";

export const siteText: Record<Locale, SiteText> = {
  ar: {
    name: site.name,
    tagline: site.tagline,
    fullName: site.fullName,
    description: site.description,
    location: site.contact.location,
    logoAlt: site.logo.alt,
    nav: [
      { href: "/", label: "الرئيسية" },
      { href: "/courses", label: "الدورات التدريبية" },
      { href: "/about-us", label: "من نحن" },
      { href: "/blog", label: "المقالات" },
      { href: "/faqs", label: "أسئلة شائعة" },
      { href: "/contact-us", label: "اتصل بنا" },
    ],
    footerLinks: [
      { href: "/about-us", label: "من نحن" },
      { href: "/courses", label: "الدورات التدريبية" },
      { href: "/faqs", label: "أسئلة شائعة" },
      { href: "/policy", label: "سياسة الخصوصية" },
    ],
    account: { href: "/account", label: "حسابي" },
    chrome: {
      skipToContent: "تخطَّ إلى المحتوى",
      mainMenu: "القائمة الرئيسية",
      menu: "القائمة",
      breadcrumb: "مسار التنقل",
      home: "الرئيسية",
      quickLinks: "روابط سريعة",
      contactUs: "تواصل معنا",
      rights: "جميع الحقوق محفوظة.",
      helpLinks: "روابط مساعدة",
      privacyPolicy: "سياسة الخصوصية",
      whatsapp: "واتساب",
      whatsappAria: "تواصل معنا عبر واتساب",
      switchLanguage: "English",
      notFoundTitle: "الصفحة غير موجودة",
      notFoundText: "ربما تم نقل الصفحة أو أن الرابط غير صحيح.",
      backHome: "العودة إلى الرئيسية",
      errorTitle: "حدث خطأ غير متوقع",
      errorText: "نعتذر عن ذلك. حاول مرة أخرى بعد قليل.",
      retry: "إعادة المحاولة",
      loading: "جارٍ التحميل…",
    },
  },
  en: {
    name: englishName,
    tagline: englishTagline,
    fullName: `${englishName} ${englishTagline}`,
    description:
      "Professional training in Applied Behaviour Analysis (ABA), special education, and psychological and behavioural rehabilitation, supervised directly by Dr Muaffaq Aqel.",
    location: "Amman, Jordan",
    logoAlt: "Dr Muaffaq Aqel Academy logo",
    nav: [
      { href: "/", label: "Home" },
      { href: "/courses", label: "Courses" },
      { href: "/about-us", label: "About us" },
      { href: "/blog", label: "Articles" },
      { href: "/faqs", label: "FAQs" },
      { href: "/contact-us", label: "Contact us" },
    ],
    footerLinks: [
      { href: "/about-us", label: "About us" },
      { href: "/courses", label: "Courses" },
      { href: "/faqs", label: "FAQs" },
      { href: "/policy", label: "Privacy policy" },
    ],
    account: { href: "/account", label: "My account" },
    chrome: {
      skipToContent: "Skip to content",
      mainMenu: "Main menu",
      menu: "Menu",
      breadcrumb: "Breadcrumb",
      home: "Home",
      quickLinks: "Quick links",
      contactUs: "Contact us",
      rights: "All rights reserved.",
      helpLinks: "Help links",
      privacyPolicy: "Privacy policy",
      whatsapp: "WhatsApp",
      whatsappAria: "Message us on WhatsApp",
      switchLanguage: "العربية",
      notFoundTitle: "Page not found",
      notFoundText: "The page may have moved, or the link may be wrong.",
      backHome: "Back to the home page",
      errorTitle: "Something went wrong",
      errorText: "Sorry about that. Please try again in a moment.",
      retry: "Try again",
      loading: "Loading…",
    },
  },
};
