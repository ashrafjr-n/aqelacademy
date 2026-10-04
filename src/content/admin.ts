import type { BookingStatus } from "@/content/bookings";
import type { NavLink } from "@/types/content";

export const adminSections = {
  home: { href: "/admin", label: "الرئيسية" },
  bookings: { href: "/admin/bookings", label: "الطلبات" },
  messages: { href: "/admin/messages", label: "الرسائل" },
  students: { href: "/admin/students", label: "الطلاب" },
} satisfies Record<string, NavLink>;

/** Booking list filters, in the order the doctor sees them. */
export const adminBookingFilters: { status: BookingStatus; label: string; empty: string }[] = [
  { status: "pending", label: "بانتظار ردّك", empty: "لا توجد طلبات جديدة. كل شيء تمام!" },
  { status: "approved", label: "تمت الموافقة", empty: "لا توجد طلبات موافق عليها بعد." },
  { status: "rejected", label: "غير موافق عليها", empty: "لا توجد طلبات مرفوضة." },
];

export const adminCopy = {
  title: "لوحة الدكتور",
  navLabel: "أقسام لوحة الدكتور",
  viewSite: "عرض الموقع",
  signOut: "تسجيل الخروج",
  greeting: "أهلًا بك دكتور",
  overview: "هذا ملخص طلبات الأكاديمية ورسائلها اليوم.",
  unreadCard: "رسائل لم تقرأها",
  rejectedFilter: "غير موافق عليها",
  latestMessages: "آخر الرسائل",
  seeAll: "عرض الكل",
  noPending: "لا توجد طلبات جديدة. كل شيء تمام!",
  noPendingText: "ستظهر هنا الطلبات الجديدة فور وصولها.",
  bookingsDescription: "راجع الطلبات ووافق عليها أو ارفضها، وتواصل مع الطلاب.",
  messagesDescription: "محادثاتك مع الطلاب، الأحدث أولًا.",
  studentsDescription: "كل من سجّل في المنصة، مع طرق التواصل معه.",
  bookingDetails: "تفاصيل الطلب",
  decisions: "القرار",
  contact: "التواصل مع الطالب",
  joinedOn: "انضم في",
  bookingsCount: (count: number) => (count === 1 ? "طلب واحد" : `${count} طلبات`),
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
  return `مرحبًا ${studentName}، معك الدكتور موفق عقل بخصوص طلبك لـ ${courseTitle}.`;
}

export function adminStudentWhatsAppMessage(studentName: string): string {
  return `مرحبًا ${studentName}، معك الدكتور موفق عقل من الأكاديمية.`;
}
