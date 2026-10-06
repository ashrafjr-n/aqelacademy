import type { AuthError } from "@supabase/supabase-js";
import type { Locale } from "@/lib/i18n";

const messages: Record<Locale, Record<string, string>> = {
  ar: {
    invalid_credentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    email_not_confirmed: "حسابك غير مفعّل بعد. أدخل رمز التأكيد الذي أرسلناه إلى بريدك في الأسفل، أو اطلب رمزًا جديدًا.",
    captcha_failed: "تعذّر التحقق من أنك لست روبوتًا. حاول مرة أخرى.",
    over_request_rate_limit: "محاولات كثيرة. انتظر قليلًا ثم حاول مرة أخرى.",
    over_email_send_rate_limit: "أرسلنا رسائل كثيرة مؤخرًا. انتظر قليلًا ثم حاول مرة أخرى.",
    weak_password: "كلمة المرور ضعيفة. استخدم 10 أحرف على الأقل مع حرف إنجليزي ورقم.",
    same_password: "كلمة المرور الجديدة يجب أن تختلف عن الحالية.",
    email_address_invalid: "أدخل بريدًا إلكترونيًا صحيحًا.",
    signup_disabled: "التسجيل متوقف حاليًا.",
    reauthentication_needed: "يرجى تسجيل الدخول من جديد ثم المحاولة.",
    otp_expired: "الرمز غير صحيح أو انتهت صلاحيته. تحقّق منه أو اطلب رمزًا جديدًا.",
  },
  en: {
    invalid_credentials: "The email address or password is incorrect.",
    email_not_confirmed: "Your account isn't active yet. Enter the confirmation code we emailed you below, or ask for a new one.",
    captcha_failed: "We couldn't confirm that you're not a robot. Please try again.",
    over_request_rate_limit: "Too many attempts. Please wait a moment and try again.",
    over_email_send_rate_limit: "We've sent a lot of emails recently. Please wait a moment and try again.",
    weak_password: "This password is too weak. Use at least 10 characters, with an English letter and a number.",
    same_password: "Your new password must be different from your current one.",
    email_address_invalid: "Enter a valid email address.",
    signup_disabled: "Registration is closed at the moment.",
    reauthentication_needed: "Please sign in again, then try once more.",
    otp_expired: "The code is wrong or has expired. Check it, or ask for a new one.",
  },
};

const fallback: Record<Locale, string> = {
  ar: "حدث خطأ غير متوقع. حاول مرة أخرى.",
  en: "Something went wrong. Please try again.",
};

/** User-safe message for a Supabase auth error. Unknown errors are logged, never shown raw. */
export function authErrorMessage(error: AuthError, locale: Locale): string {
  const message = error.code ? messages[locale][error.code] : undefined;
  if (!message) console.error("Unhandled auth error", { code: error.code, status: error.status, message: error.message });
  return message ?? fallback[locale];
}
