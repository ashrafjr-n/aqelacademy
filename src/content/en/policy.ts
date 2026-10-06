import { site } from "@/content/site";
import type { RichBlock } from "@/types/content";

/** The English version of the privacy policy in src/content/policy.ts. Keep both in step. */
export const policyBodyEn: RichBlock[] = [
  {
    type: "paragraph",
    text: "Dr Muaffaq Aqel Academy for Applied Behaviour Analysis and Rehabilitation (‘the academy’, ‘we’) respects your privacy. This policy explains in plain language what we collect when you use our platform, why we collect it, who can see it, and how you stay in control of your data.",
  },
  { type: "heading", level: 2, text: "1) The data we collect" },
  {
    type: "list",
    ordered: false,
    items: [
      "**Account details:** your full name, email address and password. Your password is stored in a protected (hashed) form that nobody can read, including us. If you sign up with Google, we only receive your name and email address.",
      "**Optional details:** your phone number and country, if you add them.",
      "**Booking details:** the courses you ask to book, the status of each request, and any note you write with it.",
      "**Messages:** the messages you exchange with the doctor on the platform.",
      "**Your consent:** the date and time you agreed to this policy.",
      "**Technical data for security:** such as your IP address and browser type, which our hosting provider processes to protect the platform from attacks and bots.",
    ],
  },
  {
    type: "paragraph",
    text: "We do not collect payment details: payment happens outside the platform, by arrangement with the academy. Please **do not include any health information** or details about children in your notes or messages.",
  },
  { type: "heading", level: 2, text: "2) How we use your data" },
  {
    type: "list",
    ordered: false,
    items: [
      "To create your account, sign you in and help you reset your password.",
      "To receive booking requests, and to let the doctor review them, reply and contact you.",
      "To send notifications and messages about your requests.",
      "To protect the platform from misuse and fake accounts.",
    ],
  },
  {
    type: "paragraph",
    text: "We do not send marketing messages, and we do not use tracking, analytics or advertising tools.",
  },
  { type: "heading", level: 2, text: "3) Legal basis" },
  {
    type: "paragraph",
    text: "We process your data based on **your explicit consent**, which you give when you create your account. You can withdraw your consent at any time by deleting your account (see section 8).",
  },
  { type: "heading", level: 2, text: "4) Who can see your data" },
  {
    type: "paragraph",
    text: "Only the doctor and authorised staff at the academy can see your data, and only to serve you. We also rely on service providers that process data on our behalf to run the platform:",
  },
  {
    type: "list",
    ordered: false,
    items: [
      "**Supabase:** the database and sign-in, on servers in Frankfurt, Germany.",
      "**Cloudflare:** website hosting and security, and checking that you are not a bot.",
      "**Resend:** sending emails, such as account confirmation and password reset.",
      "**Google:** signing in with Google if you choose to, and storing encrypted backups on Google Drive.",
    ],
  },
  {
    type: "paragraph",
    text: "We do not sell your data or share it with anyone for marketing. We will only disclose it if the law requires us to.",
  },
  { type: "heading", level: 2, text: "5) Transfers outside your country" },
  {
    type: "paragraph",
    text: "Your data is stored in the European Union (Germany) with providers that apply high protection standards, and encrypted backups are kept on Google Drive. By agreeing to this policy, you agree to this transfer.",
  },
  { type: "heading", level: 2, text: "6) Cookies" },
  {
    type: "paragraph",
    text: "We only use essential cookies to sign you in and keep your session. They are protected so that scripts in the browser cannot read them. We do not use tracking or advertising cookies. Cloudflare's verification service and Google sign-in may use technical data they need to work.",
  },
  { type: "heading", level: 2, text: "7) How we protect your data" },
  {
    type: "list",
    ordered: false,
    items: [
      "All connections to the platform are encrypted (HTTPS).",
      "The database is restricted so that each user can only see their own data, and only authorised staff can open the admin area.",
      "Decisions on booking requests are logged with the time and the person who made them.",
      "Protection against repeated sign-in attempts and bots.",
    ],
  },
  {
    type: "paragraph",
    text: "However, no way of sending or storing data over the internet is 100% secure.",
  },
  { type: "heading", level: 2, text: "8) Keeping and deleting your data" },
  {
    type: "paragraph",
    text: "We keep your data for as long as your account exists. You can **delete your account yourself at any time** from the ‘My account’ page, which permanently deletes your data, bookings, messages and notifications. Encrypted backups may remain for up to 30 days, after which they are deleted automatically.",
  },
  { type: "heading", level: 2, text: "9) Your rights" },
  {
    type: "list",
    ordered: false,
    items: [
      "View your data, and update your name, phone number and country from the ‘My account’ page.",
      "Ask us for a copy of your data.",
      "Permanently delete your account and data from the ‘My account’ page.",
      "Withdraw your consent at any time by deleting your account.",
    ],
  },
  { type: "heading", level: 2, text: "10) If there is a data breach" },
  {
    type: "paragraph",
    text: "If your data is affected by a breach, we will tell you and the relevant authorities without delay, within the time limits set by law.",
  },
  { type: "heading", level: 2, text: "11) Children's privacy" },
  {
    type: "paragraph",
    text: "The platform is for adults: specialists, teachers and parents. Please do not create an account in a child's name. If you are a parent and believe a child has created an account, contact us and we will delete it.",
  },
  { type: "heading", level: 2, text: "12) Changes to this policy" },
  {
    type: "paragraph",
    text: "We may update this policy when the way the platform works changes, and we will show the ‘last updated’ date at the top. If a change is significant, we will let you know on the platform.",
  },
  { type: "heading", level: 2, text: "13) Contact us" },
  {
    type: "paragraph",
    text: "For any question or request about your data:",
  },
  {
    type: "list",
    ordered: false,
    items: [`**Email:** ${site.contact.email}`, `**Phone/WhatsApp:** ${site.contact.phoneDisplay}`],
  },
];
