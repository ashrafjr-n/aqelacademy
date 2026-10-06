import type { Locale } from "@/lib/i18n";

interface AccountCopy {
  /** The profile page: "/account". */
  title: string;
  profileDescription: string;
  personalInfo: string;
  saveChanges: string;
  saving: string;
  saved: string;
  security: string;
  securityText: string;
  changePassword: string;
  signOut: string;
  deleteTitle: string;
  deleteText: string;
  deleteButton: string;
  deleteQuestion: string;
  loadFailed: string;
  dashboard: string;
  adminCard: string;
}

export const accountCopy: Record<Locale, AccountCopy> = {
  ar: {
    title: "الملف الشخصي",
    profileDescription: "بياناتك التي يراها الدكتور عند التواصل معك.",
    personalInfo: "البيانات الشخصية",
    saveChanges: "حفظ التغييرات",
    saving: "جارٍ الحفظ…",
    saved: "تم حفظ بياناتك.",
    security: "الأمان",
    securityText: "غيّر كلمة المرور، أو سجّل الخروج من هذا الجهاز.",
    changePassword: "تغيير كلمة المرور",
    signOut: "تسجيل الخروج",
    deleteTitle: "حذف الحساب",
    deleteText: "يحذف حسابك وبياناتك وحجوزاتك ورسائلك نهائيًا، ولا يمكن التراجع عن ذلك.",
    deleteButton: "حذف حسابي نهائيًا",
    deleteQuestion: "هل أنت متأكد؟ لا يمكن التراجع عن ذلك.",
    loadFailed: "تعذّر تحميل بيانات حسابك. حاول تحديث الصفحة.",
    dashboard: "لوحة التحكم",
    adminCard: "افتح لوحة التحكم لإدارة الطلبات والرسائل.",
  },
  en: {
    title: "Profile",
    profileDescription: "The details the doctor sees when contacting you.",
    personalInfo: "Personal details",
    saveChanges: "Save changes",
    saving: "Saving…",
    saved: "Your details have been saved.",
    security: "Security",
    securityText: "Change your password, or sign out of this device.",
    changePassword: "Change password",
    signOut: "Sign out",
    deleteTitle: "Delete account",
    deleteText: "This permanently deletes your account, data, bookings and messages. It can't be undone.",
    deleteButton: "Delete my account permanently",
    deleteQuestion: "Are you sure? This can't be undone.",
    loadFailed: "We couldn't load your account details. Try refreshing the page.",
    dashboard: "Dashboard",
    adminCard: "Open the dashboard to manage requests and messages.",
  },
};
