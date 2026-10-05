import type { BookingStatus } from "@/content/bookings";
import { formatCount } from "@/lib/format";
import type { NavLink } from "@/types/content";

export const adminSections = {
  home: { href: "/admin", label: "الرئيسية" },
  bookings: { href: "/admin/bookings", label: "الطلبات" },
  messages: { href: "/admin/messages", label: "الرسائل" },
  students: { href: "/admin/students", label: "الطلاب" },
} satisfies Record<string, NavLink>;

/** Booking list filters, in the order the doctor sees them. */
export const adminBookingFilters: { status: BookingStatus; label: string; empty: string }[] = [
  { status: "pending", label: "بانتظار ردّك", empty: "لا توجد طلبات جديدة حاليًا." },
  { status: "approved", label: "تمت الموافقة", empty: "لا توجد طلبات موافق عليها بعد." },
  { status: "rejected", label: "غير موافق عليها", empty: "لا توجد طلبات مرفوضة." },
];

export const adminCopy = {
  title: "لوحة الدكتور",
  headerLink: "لوحة التحكم",
  navLabel: "أقسام لوحة الدكتور",
  backToSite: "العودة إلى الموقع",
  backToSiteShort: "الموقع",
  signOut: "تسجيل الخروج",
  greeting: "أهلًا بك يا دكتور",
  overview: "هذا ملخص طلبات الأكاديمية ورسائلها اليوم.",
  unreadCard: "رسائل لم تقرأها",
  rejectedFilter: "غير موافق عليها",
  latestMessages: "آخر الرسائل",
  seeAll: "عرض الكل",
  noPending: "لا توجد طلبات جديدة حاليًا.",
  noPendingText: "ستظهر هنا الطلبات الجديدة فور وصولها.",
  bookingsDescription: "راجع الطلبات ووافق عليها أو ارفضها، وتواصل مع الطلاب.",
  messagesDescription: "محادثاتك مع الطلاب، الأحدث أولًا.",
  studentsDescription: "كل من سجّل في المنصة، مع طرق التواصل معه.",
  bookingDetails: "تفاصيل الطلب",
  decisions: "القرار",
  contact: "التواصل مع الطالب",
  joinedOn: "انضم في",
  bookingsCount: (count: number) =>
    formatCount(count, { zero: "لا توجد طلبات", one: "طلب واحد", two: "طلبان", few: "# طلبات", many: "# طلبًا", other: "# طلب" }),
  pendingCard: "طلبات بانتظار ردّك",
  studentsCard: "الطلاب المسجّلون",
  approvedCard: "طلبات تمت الموافقة عليها",
  latestPending: "أقدم الطلبات المنتظرة",
  noteLabel: "ملاحظة الطالب",
  noPhone: "لم يضف رقم هاتف",
  studentsSearch: "ابحث بالاسم أو البريد الإلكتروني",
  noStudents: "لا يوجد طلاب بهذا البحث.",
};

export function adminWhatsAppMessage(studentName: string, courseTitle: string): string {
  return `مرحبًا ${studentName}، أنا الدكتور موفق عقل، أتواصل معك بخصوص طلبك لـ ${courseTitle}.`;
}

export function adminStudentWhatsAppMessage(studentName: string): string {
  return `مرحبًا ${studentName}، أنا الدكتور موفق عقل من الأكاديمية.`;
}
