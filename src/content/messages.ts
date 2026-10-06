import { formatCount } from "@/lib/format";

export type MessageFailure = "not_allowed" | "rate_limited" | "invalid";

export const MESSAGE_MAX_LENGTH = 1000;

export const messagesCopy = {
  threadTitle: "المحادثة",
  doctorName: "الدكتور موفق عقل",
  you: "أنت",
  read: "تمت القراءة",
  empty: "لا توجد رسائل بعد.",
  emptyAdmin: "لا توجد رسائل بعد. اكتب أول رسالة للطالب.",
  waitForApproval: "تستطيع مراسلة الدكتور بعد الموافقة على طلبك.",
  closedRejected: "لا تتوفر المراسلة في طلب لم تتم الموافقة عليه. إن كان لديك استفسار، تواصل معنا عبر واتساب.",
  composerLabel: "رسالتك",
  composerPlaceholder: "اكتب رسالتك…",
  composerHint: "لا تكتب معلومات صحية أو بيانات حساسة.",
  send: "إرسال",
  sending: "جارٍ الإرسال…",
  inboxTitle: "الرسائل",
  signInPrompt: "سجّل الدخول لتتواصل مع الدكتور بعد الموافقة على حجزك.",
  startChat: "ابدأ المحادثة مع الدكتور.",
  noConversations: "لا توجد محادثات بعد.",
  noConversationsText: "تبدأ المحادثة مع الدكتور بعد الموافقة على حجزك.",
  inboxEmpty: "لا توجد محادثات بعد. تبدأ المحادثة من صفحة أي طلب.",
  openConversation: "فتح المحادثة",
  newMessages: (count: number) =>
    formatCount(count, { one: "رسالة جديدة", two: "رسالتان جديدتان", few: "# رسائل جديدة", many: "# رسالة جديدة", other: "# رسالة جديدة" }),
  failures: {
    not_allowed: "لا يمكن إرسال رسائل في هذا الطلب حاليًا.",
    rate_limited: "أرسلت رسائل كثيرة بسرعة. انتظر دقيقة ثم حاول مرة أخرى.",
    invalid: "اكتب رسالة من 1 إلى 1000 حرف.",
  } satisfies Record<MessageFailure, string>,
};
