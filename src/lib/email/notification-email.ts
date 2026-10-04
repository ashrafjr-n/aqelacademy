import { site } from "@/content/site";

const escapes: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Names, course titles… come from users: never put them into HTML unescaped. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => escapes[character]);
}

export interface NotificationEmailInput {
  title: string;
  body: string;
  actionLabel: string;
  actionUrl: string;
}

/** Arabic, right-to-left email with one button, matching the auth email templates. */
export function renderNotificationEmail({ title, body, actionLabel, actionUrl }: NotificationEmailInput): { html: string; text: string } {
  const html = `<!doctype html>
<html lang="ar" dir="rtl">
  <body style="margin:0;padding:24px;background:#f5f5f5;font-family:Tahoma,Arial,sans-serif;color:#162648;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;text-align:right;">
      <p style="margin:0 0 24px;font-size:14px;color:#555555;">${escapeHtml(site.name)}</p>
      <h1 style="margin:0 0 16px;font-size:22px;">${escapeHtml(title)}</h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#555555;">${escapeHtml(body)}</p>
      <p style="margin:0 0 24px;"><a href="${escapeHtml(actionUrl)}" style="display:inline-block;background:#ff782d;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 28px;border-radius:999px;">${escapeHtml(actionLabel)}</a></p>
      <p style="margin:0;font-size:13px;line-height:1.8;color:#888888;">وصلتك هذه الرسالة لأن لديك حسابًا في المنصّة. لا تردّ على هذا البريد؛ استخدم الرسائل داخل المنصّة.</p>
    </div>
  </body>
</html>`;
  const text = `${title}\n\n${body}\n\n${actionLabel}: ${actionUrl}\n\n— ${site.name}`;
  return { html, text };
}
