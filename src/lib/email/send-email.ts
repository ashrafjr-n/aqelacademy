import "server-only";
import { site } from "@/content/site";
import { getEnv } from "@/lib/env";

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Sends through the Resend HTTP API. Never throws: a failed notification email must not
 * break the action that triggered it. Skipped (with a log line) until RESEND_API_KEY is set.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailInput): Promise<void> {
  const { RESEND_API_KEY } = getEnv();
  if (!RESEND_API_KEY) {
    console.warn("Notification email skipped: RESEND_API_KEY is not set");
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      // A real, monitored Reply-To (instead of only "no-reply") helps inbox placement.
      body: JSON.stringify({ from: `${site.name} <no-reply@aqelacademy.com>`, reply_to: site.contact.email, to: [to], subject, html, text }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) console.error("Notification email failed", { status: response.status, subject });
  } catch (error) {
    console.error("Notification email failed", { subject, error: error instanceof Error ? error.message : String(error) });
  }
}
