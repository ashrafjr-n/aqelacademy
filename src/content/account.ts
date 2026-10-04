import type { NavLink } from "@/types/content";

export const accountSections = {
  profile: { href: "/account", label: "الملف الشخصي" },
  bookings: { href: "/account/bookings", label: "حجوزاتي" },
  messages: { href: "/account/messages", label: "الرسائل" },
  notifications: { href: "/account/notifications", label: "الإشعارات" },
} satisfies Record<string, NavLink>;

export const accountCopy = {
  navLabel: "أقسام الحساب",
  profileDescription: "بياناتك التي يراها الدكتور عند التواصل معك.",
  personalInfo: "البيانات الشخصية",
  security: "الأمان",
  securityText: "غيّر كلمة المرور، أو سجّل الخروج من هذا الجهاز.",
  changePassword: "تغيير كلمة المرور",
  signOut: "تسجيل الخروج",
  deleteTitle: "حذف الحساب",
  deleteText: "يحذف حسابك وبياناتك وحجوزاتك ورسائلك نهائيًا، ولا يمكن التراجع عن ذلك.",
  deleteButton: "حذف حسابي نهائيًا",
  deleteQuestion: "متأكد؟ لا يمكن التراجع.",
  loadFailed: "تعذّر تحميل بيانات حسابك. حاول تحديث الصفحة.",
  adminCard: "افتح لوحة الدكتور لإدارة الطلبات والرسائل.",
  bookingsDescription: "تابع حالة طلباتك وتواصل مع الدكتور.",
  bookCourse: "احجز دورة",
  messagesDescription: "محادثاتك مع الدكتور، محادثة لكل حجز.",
  notificationsDescription: "آخر التحديثات على طلباتك ورسائلك.",
};
