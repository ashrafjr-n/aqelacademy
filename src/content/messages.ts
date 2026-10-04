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
  composerLabel: "رسالتك",
  composerPlaceholder: "اكتب رسالتك…",
  composerHint: "لا تكتب معلومات صحية أو بيانات حساسة.",
  send: "إرسال",
  sending: "جارٍ الإرسال…",
  inboxTitle: "الرسائل",
  startChat: "ابدأ المحادثة مع الدكتور.",
  noConversations: "لا توجد محادثات بعد. تبدأ المحادثة بعد الموافقة على حجزك.",
  seeAll: "عرض كل الرسائل",
  inboxEmpty: "لا توجد محادثات بعد. تبدأ المحادثة من صفحة أي طلب.",
  openConversation: "فتح المحادثة",
  newMessages: (count: number) => (count === 1 ? "رسالة جديدة" : `${count} رسائل جديدة`),
  failures: {
    not_allowed: "لا يمكن إرسال رسائل في هذا الطلب حاليًا.",
    rate_limited: "أرسلت رسائل كثيرة بسرعة. انتظر دقيقة ثم حاول مرة أخرى.",
    invalid: "اكتب رسالة من 1 إلى 1000 حرف.",
  } satisfies Record<MessageFailure, string>,
};
