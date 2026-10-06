import { formatCount, formatEnglishCount } from "@/lib/format";
import type { Locale } from "@/lib/i18n";

export type MessageFailure = "not_allowed" | "rate_limited" | "invalid";

export const MESSAGE_MAX_LENGTH = 1000;

interface MessagesCopy {
  threadTitle: string;
  you: string;
  read: string;
  empty: string;
  emptyAdmin: string;
  waitForApproval: string;
  closedRejected: string;
  composerLabel: string;
  composerPlaceholder: string;
  composerHint: string;
  send: string;
  sending: string;
  inboxTitle: string;
  signInPrompt: string;
  startChat: string;
  noConversations: string;
  noConversationsText: string;
  inboxEmpty: string;
  openConversation: string;
  newMessages: (count: number) => string;
  failures: Record<MessageFailure, string>;
}

/** The dashboard only uses the Arabic side. */
export const messagesCopy: Record<Locale, MessagesCopy> = {
  ar: {
    threadTitle: "المحادثة",
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
    newMessages: (count) =>
      formatCount(count, { one: "رسالة جديدة", two: "رسالتان جديدتان", few: "# رسائل جديدة", many: "# رسالة جديدة", other: "# رسالة جديدة" }),
    failures: {
      not_allowed: "لا يمكن إرسال رسائل في هذا الطلب حاليًا.",
      rate_limited: "أرسلت رسائل كثيرة بسرعة. انتظر دقيقة ثم حاول مرة أخرى.",
      invalid: "اكتب رسالة من 1 إلى 1000 حرف.",
    },
  },
  en: {
    threadTitle: "Conversation",
    you: "You",
    read: "Read",
    empty: "No messages yet.",
    emptyAdmin: "No messages yet. Write the first message to the student.",
    waitForApproval: "You can message the doctor once your request is approved.",
    closedRejected: "Messaging isn't available for a request that wasn't approved. If you have a question, contact us on WhatsApp.",
    composerLabel: "Your message",
    composerPlaceholder: "Write your message…",
    composerHint: "Please don't include health information or other sensitive details.",
    send: "Send",
    sending: "Sending…",
    inboxTitle: "Messages",
    signInPrompt: "Sign in to message the doctor once your booking is approved.",
    startChat: "Start your conversation with the doctor.",
    noConversations: "No conversations yet.",
    noConversationsText: "Your conversation with the doctor opens once your booking is approved.",
    inboxEmpty: "No conversations yet. Start one from any request page.",
    openConversation: "Open conversation",
    newMessages: (count) => formatEnglishCount(count, "new message", "new messages"),
    failures: {
      not_allowed: "You can't send messages on this request at the moment.",
      rate_limited: "You've sent several messages very quickly. Please wait a minute and try again.",
      invalid: "Write a message of 1 to 1,000 characters.",
    },
  },
};
