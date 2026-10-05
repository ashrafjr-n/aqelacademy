import type { AuthError } from "@supabase/supabase-js";

const messages: Record<string, string> = {
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
};

const fallback = "حدث خطأ غير متوقع. حاول مرة أخرى.";

/** Arabic, user-safe message for a Supabase auth error. Unknown errors are logged, never shown raw. */
export function authErrorMessage(error: AuthError): string {
  const message = error.code ? messages[error.code] : undefined;
  if (!message) console.error("Unhandled auth error", { code: error.code, status: error.status, message: error.message });
  return message ?? fallback;
}
