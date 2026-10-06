import type { NavLink } from "@/types/content";

export const accountSections = {
  profile: { href: "/account", label: "الملف الشخصي" },
} satisfies Record<string, NavLink>;

export const accountCopy = {
  profileDescription: "بياناتك التي يراها الدكتور عند التواصل معك.",
  personalInfo: "البيانات الشخصية",
  security: "الأمان",
  securityText: "غيّر كلمة المرور، أو سجّل الخروج من هذا الجهاز.",
  changePassword: "تغيير كلمة المرور",
  signOut: "تسجيل الخروج",
  deleteTitle: "حذف الحساب",
  deleteText: "يحذف حسابك وبياناتك وحجوزاتك ورسائلك نهائيًا، ولا يمكن التراجع عن ذلك.",
  deleteButton: "حذف حسابي نهائيًا",
  deleteQuestion: "هل أنت متأكد؟ لا يمكن التراجع عن ذلك.",
  loadFailed: "تعذّر تحميل بيانات حسابك. حاول تحديث الصفحة.",
  adminCard: "افتح لوحة التحكم لإدارة الطلبات والرسائل.",
};
