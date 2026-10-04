import type { BookingStatus } from "@/content/bookings";
import type { NavLink } from "@/types/content";

export const adminTabs: NavLink[] = [
  { href: "/admin", label: "الرئيسية" },
  { href: "/admin/bookings", label: "الطلبات" },
  { href: "/admin/students", label: "الطلاب" },
];

/** Booking list filters, in the order the doctor sees them. */
export const adminBookingFilters: { status: BookingStatus; label: string; empty: string }[] = [
  { status: "pending", label: "بانتظار ردّك", empty: "لا توجد طلبات جديدة. كل شيء تمام!" },
  { status: "approved", label: "تمت الموافقة", empty: "لا توجد طلبات موافق عليها بعد." },
  { status: "rejected", label: "غير موافق عليها", empty: "لا توجد طلبات مرفوضة." },
];

export const adminCopy = {
  title: "لوحة الدكتور",
  greeting: "أهلًا بك دكتور",
  pendingCard: "طلبات بانتظار ردّك",
  studentsCard: "الطلاب المسجّلون",
  approvedCard: "طلبات تمت الموافقة عليها",
  latestPending: "أقدم الطلبات المنتظرة",
  allPending: "عرض كل الطلبات",
  noteLabel: "ملاحظة الطالب",
  noPhone: "لم يضف رقم هاتف",
  studentsSearch: "ابحث بالاسم أو البريد الإلكتروني",
  noStudents: "لا يوجد طلاب بهذا البحث.",
};

export function adminWhatsAppMessage(studentName: string, courseTitle: string): string {
  return `مرحبًا ${studentName}، معك الدكتور موفق عقل بخصوص طلبك لـ ${courseTitle}.`;
}
