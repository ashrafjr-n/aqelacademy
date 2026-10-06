import { EMAIL_CODE_LENGTH } from "@/content/auth";
import type { Locale } from "@/lib/i18n";

/** Schemas report one of these keys; the action turns it into text in the visitor's language. */
const messages = {
  ar: {
    nameTooShort: "الاسم قصير جدًا.",
    nameTooLong: "الاسم طويل جدًا.",
    emailInvalid: "أدخل بريدًا إلكترونيًا صحيحًا.",
    emailTooLong: "البريد الإلكتروني طويل جدًا.",
    passwordTooShort: "كلمة المرور يجب أن تكون 10 أحرف على الأقل.",
    passwordTooLong: "كلمة المرور طويلة جدًا (72 حرفًا كحد أقصى).",
    passwordNeedsLetter: "كلمة المرور يجب أن تحتوي على حرف إنجليزي واحد على الأقل.",
    passwordNeedsDigit: "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل.",
    passwordRequired: "أدخل كلمة المرور.",
    passwordsDontMatch: "كلمتا المرور غير متطابقتين.",
    phoneInvalid: "رقم الهاتف غير صحيح.",
    phoneNeedsCountry: "اختر الدولة أولًا، أو اكتب الرقم مع رمز الدولة.",
    countryInvalid: "اختر دولة من القائمة.",
    captchaPending: "يرجى الانتظار حتى يكتمل التحقق الأمني.",
    codeFormat: `أدخل الرمز المكوّن من ${EMAIL_CODE_LENGTH} أرقام.`,
    privacyRequired: "يجب الموافقة على سياسة الخصوصية للمتابعة.",
    noteTooLong: "الملاحظة طويلة جدًا (500 حرف كحد أقصى).",
    invalid: "القيمة غير صحيحة.",
  },
  en: {
    nameTooShort: "Your name is too short.",
    nameTooLong: "Your name is too long.",
    emailInvalid: "Enter a valid email address.",
    emailTooLong: "This email address is too long.",
    passwordTooShort: "Your password must be at least 10 characters long.",
    passwordTooLong: "Your password is too long (72 characters at most).",
    passwordNeedsLetter: "Your password must include at least one English letter (a–z).",
    passwordNeedsDigit: "Your password must include at least one number.",
    passwordRequired: "Enter your password.",
    passwordsDontMatch: "The passwords don't match.",
    phoneInvalid: "This phone number isn't valid.",
    phoneNeedsCountry: "Choose your country first, or type the number with its country code.",
    countryInvalid: "Choose a country from the list.",
    captchaPending: "Please wait for the security check to finish.",
    codeFormat: `Enter the ${EMAIL_CODE_LENGTH}-digit code.`,
    privacyRequired: "You need to agree to the privacy policy to continue.",
    noteTooLong: "Your note is too long (500 characters at most).",
    invalid: "This value isn't valid.",
  },
} satisfies Record<Locale, Record<string, string>>;

export type ValidationKey = keyof (typeof messages)["ar"];

/** For a schema's `error` option: `.min(2, issue("nameTooShort"))`. */
export function issue(key: ValidationKey): { error: ValidationKey } {
  return { error: key };
}

/** A schema issue's text in the given language; unknown messages (Zod's own) fall back to a generic one. */
export function validationMessage(key: string, locale: Locale): string {
  const table: Record<string, string> = messages[locale];
  return table[key] ?? messages[locale].invalid;
}
