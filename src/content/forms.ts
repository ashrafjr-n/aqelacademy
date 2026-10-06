import type { Locale } from "@/lib/i18n";

interface FormsCopy {
  optional: string;
  email: string;
  password: string;
  showPassword: string;
  hidePassword: string;
  country: string;
  countryPlaceholder: string;
  phone: string;
  phoneHint: string;
  captcha: { checking: string; verified: string; failed: string };
  /** The second step of a confirm button, e.g. "Yes, delete my account". */
  confirmYes: (label: string) => string;
  confirmCancel: string;
}

/** Labels shared by every form (sign-in, profile, booking, and the dashboard's confirm buttons). */
export const formsCopy: Record<Locale, FormsCopy> = {
  ar: {
    optional: "(اختياري)",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    country: "الدولة",
    countryPlaceholder: "— اختر الدولة —",
    phone: "رقم الهاتف",
    phoneHint: "اختر الدولة أولًا ليُضاف رمزها تلقائيًا.",
    captcha: {
      checking: "جارٍ التحقق الأمني…",
      verified: "تم التحقق الأمني",
      failed: "تعذّر التحقق الأمني. حدّث الصفحة وحاول مرة أخرى.",
    },
    confirmYes: (label) => `نعم، ${label}`,
    confirmCancel: "تراجع",
  },
  en: {
    optional: "(optional)",
    email: "Email address",
    password: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    country: "Country",
    countryPlaceholder: "— Choose a country —",
    phone: "Phone number",
    phoneHint: "Choose your country first and its code will be added for you.",
    captcha: {
      checking: "Running a security check…",
      verified: "Security check complete",
      failed: "The security check failed. Refresh the page and try again.",
    },
    confirmYes: (label) => `Yes, ${label.charAt(0).toLowerCase()}${label.slice(1)}`,
    confirmCancel: "Cancel",
  },
};
