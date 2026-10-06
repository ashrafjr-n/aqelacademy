import type { Locale } from "@/lib/i18n";

/** Digits in the code from a sign-up or password reset email; must match `otp_length` in supabase/config.toml. */
export const EMAIL_CODE_LENGTH = 8;

interface AuthCopy {
  login: { title: string; subtitle: string; submit: string; pending: string; forgotPassword: string; noAccount: string; createAccount: string };
  register: {
    title: string;
    subtitle: string;
    success: string;
    fullName: string;
    passwordHint: string;
    privacyBefore: string;
    privacyLink: string;
    privacyAfter: string;
    submit: string;
    pending: string;
    haveAccount: string;
    signIn: string;
  };
  emailCode: { label: string; hint: (email: string) => string; submit: { email: string; recovery: string }; pending: string };
  forgotPassword: { title: string; subtitle: string; success: string; submit: string; pending: string; backToLogin: string };
  resetPassword: { title: string; subtitle: string; newPassword: string; confirmPassword: string; submit: string; pending: string };
  confirm: { title: string; subtitle: string; submit: string; pending: string; backToLogin: string };
  adminSignIn: { title: string; subtitle: string; unavailable: string };
  resendCode: { prompt: string; submit: string; pending: string };
  resendConfirmation: { success: string };
  /** Side panel on the sign-in and sign-up pages (large screens). */
  panel: { title: string; points: string[]; security: string };
  divider: string;
  google: { consentBefore: string; consentLink: string; consentAfter: string; failed: string };
}

export const authCopy: Record<Locale, AuthCopy> = {
  ar: {
    login: {
      title: "تسجيل الدخول",
      subtitle: "أهلًا بعودتك. أدخل بريدك الإلكتروني وكلمة المرور.",
      submit: "تسجيل الدخول",
      pending: "جارٍ تسجيل الدخول…",
      forgotPassword: "نسيت كلمة المرور؟",
      noAccount: "ليس لديك حساب؟",
      createAccount: "أنشئ حسابًا",
    },
    register: {
      title: "إنشاء حساب",
      subtitle: "سجّل لتتمكن من حجز الدورات ومتابعة طلباتك والتواصل مع الدكتور.",
      success: `تم إنشاء حسابك! أرسلنا رمز تأكيد من ${EMAIL_CODE_LENGTH} أرقام إلى بريدك الإلكتروني. أدخله في الأسفل لتفعيل حسابك (تفقّد مجلد الرسائل غير المرغوب فيها إن لم تجده).`,
      fullName: "الاسم الكامل",
      passwordHint: "10 أحرف على الأقل، وفيها حرف إنجليزي ورقم.",
      privacyBefore: "قرأت",
      privacyLink: "سياسة الخصوصية",
      /** Follows the link directly, so it carries its own leading space where the language needs one. */
      privacyAfter: " وأوافق عليها.",
      submit: "إنشاء الحساب",
      pending: "جارٍ إنشاء الحساب…",
      haveAccount: "لديك حساب؟",
      signIn: "سجّل الدخول",
    },
    emailCode: {
      label: "رمز التأكيد",
      hint: (email) => `أدخل الرمز المرسل إلى ${email}`,
      submit: { email: "تفعيل الحساب", recovery: "متابعة" },
      pending: "جارٍ التحقق…",
    },
    forgotPassword: {
      title: "نسيت كلمة المرور",
      subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رمزًا لتعيين كلمة مرور جديدة.",
      success: "إذا كان البريد مسجّلًا لدينا، ستصلك رسالة فيها رمز لتعيين كلمة مرور جديدة.",
      submit: "أرسل الرمز",
      pending: "جارٍ الإرسال…",
      backToLogin: "العودة لتسجيل الدخول",
    },
    resetPassword: {
      title: "تعيين كلمة مرور جديدة",
      subtitle: "اختر كلمة مرور جديدة لحسابك.",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      submit: "حفظ كلمة المرور",
      pending: "جارٍ الحفظ…",
    },
    confirm: {
      title: "تأكيد الرابط",
      subtitle: "اضغط الزر لإكمال العملية.",
      submit: "تأكيد ومتابعة",
      pending: "جارٍ التأكيد…",
      backToLogin: "العودة لتسجيل الدخول",
    },
    adminSignIn: {
      title: "دخول لوحة التحكم",
      subtitle: "لحماية إضافية، لوحة التحكم تفتح فقط عند الدخول بحساب Google المرتبط بالأكاديمية.",
      unavailable: "الدخول بحساب Google غير مفعّل حاليًا. تواصل مع المسؤول التقني.",
    },
    resendCode: { prompt: "لم يصلك الرمز؟", submit: "أعد إرسال الرمز", pending: "جارٍ الإرسال…" },
    resendConfirmation: {
      success: "أرسلنا رمزًا جديدًا إلى بريدك. تفقّد صندوق الوارد ومجلد الرسائل غير المرغوب فيها (Spam).",
    },
    panel: {
      title: "منصّتك للتدريب في تحليل السلوك التطبيقي والتأهيل",
      points: ["احجز دورتك بخطوات بسيطة", "تابع حالة طلبك أولًا بأول", "تواصل مباشرة مع الدكتور"],
      security: "بياناتك محمية ومشفّرة",
    },
    divider: "أو بالبريد الإلكتروني",
    google: {
      consentBefore: "بالمتابعة باستخدام Google، أنت توافق على",
      consentLink: "سياسة الخصوصية",
      consentAfter: ".",
      failed: "تعذّر تسجيل الدخول باستخدام Google. حاول مرة أخرى.",
    },
  },
  en: {
    login: {
      title: "Sign in",
      subtitle: "Welcome back. Enter your email address and password.",
      submit: "Sign in",
      pending: "Signing in…",
      forgotPassword: "Forgotten your password?",
      noAccount: "Don't have an account?",
      createAccount: "Create one",
    },
    register: {
      title: "Create an account",
      subtitle: "Register to book courses, follow your requests and contact the doctor.",
      success: `Your account has been created! We've emailed you an ${EMAIL_CODE_LENGTH}-digit confirmation code. Enter it below to activate your account (check your spam folder if you can't find it).`,
      fullName: "Full name",
      passwordHint: "At least 10 characters, including an English letter and a number.",
      privacyBefore: "I have read and agree to the",
      privacyLink: "privacy policy",
      privacyAfter: ".",
      submit: "Create account",
      pending: "Creating your account…",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
    },
    emailCode: {
      label: "Confirmation code",
      hint: (email) => `Enter the code we sent to ${email}`,
      submit: { email: "Activate account", recovery: "Continue" },
      pending: "Checking…",
    },
    forgotPassword: {
      title: "Forgotten password",
      subtitle: "Enter your email address and we'll send you a code to set a new password.",
      success: "If this email address is registered with us, you'll receive a message with a code to set a new password.",
      submit: "Send code",
      pending: "Sending…",
      backToLogin: "Back to sign in",
    },
    resetPassword: {
      title: "Set a new password",
      subtitle: "Choose a new password for your account.",
      newPassword: "New password",
      confirmPassword: "Confirm password",
      submit: "Save password",
      pending: "Saving…",
    },
    confirm: {
      title: "Confirm your link",
      subtitle: "Press the button to finish.",
      submit: "Confirm and continue",
      pending: "Confirming…",
      backToLogin: "Back to sign in",
    },
    adminSignIn: {
      title: "Dashboard sign-in",
      subtitle: "For extra protection, the dashboard only opens when you sign in with the academy's Google account.",
      unavailable: "Google sign-in isn't available at the moment. Please contact the technical administrator.",
    },
    resendCode: { prompt: "Didn't get the code?", submit: "Send the code again", pending: "Sending…" },
    resendConfirmation: {
      success: "We've sent you a new code. Check your inbox and your spam folder.",
    },
    panel: {
      title: "Your platform for training in Applied Behaviour Analysis and rehabilitation",
      points: ["Book your course in a few simple steps", "Follow your request at every stage", "Contact the doctor directly"],
      security: "Your data is protected and encrypted",
    },
    divider: "or with your email",
    google: {
      consentBefore: "By continuing with Google, you agree to our",
      consentLink: "privacy policy",
      consentAfter: ".",
      failed: "We couldn't sign you in with Google. Please try again.",
    },
  },
};
