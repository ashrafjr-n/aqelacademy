import logo from "@/assets/images/logo.png";
import type { ContentImage, NavLink } from "@/types/content";

export const site = {
  name: "أكاديمية الدكتور موفق عقل",
  fullName: "أكاديمية الدكتور موفق عقل لتحليل السلوك التطبيقي والتأهيل",
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

export const mainNav: NavLink[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/courses", label: "الدورات التدريبية" },
  { href: "/about-us", label: "من نحن" },
  { href: "/blog", label: "المقالات" },
  { href: "/faqs", label: "أسئلة شائعة" },
  { href: "/contact-us", label: "اتصل بنا" },
];

export const footerLinks: NavLink[] = [
  { href: "/about-us", label: "من نحن" },
  { href: "/courses", label: "الدورات التدريبية" },
  { href: "/faqs", label: "أسئلة شائعة" },
  { href: "/policy", label: "سياسة الخصوصية" },
];
