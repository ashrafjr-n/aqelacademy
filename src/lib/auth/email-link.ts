import type { EmailOtpType } from "@supabase/supabase-js";

/** Link types our auth emails can carry (see supabase/templates). */
const emailLinkTypes = ["email", "recovery", "email_change"] as const satisfies readonly EmailOtpType[];

export type EmailLinkType = (typeof emailLinkTypes)[number];

export function isEmailLinkType(value: unknown): value is EmailLinkType {
  return typeof value === "string" && (emailLinkTypes as readonly string[]).includes(value);
}
