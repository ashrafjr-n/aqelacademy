"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { authCopy } from "@/content/auth";
import { isEmailLinkType } from "@/lib/auth/email-link";
import { authErrorMessage } from "@/lib/auth/errors";
import { safeNextPath } from "@/lib/auth/redirect";
import { requireUser } from "@/lib/dal/session";
import { getEnv } from "@/lib/env";
import { fieldErrorsOf, formValues, type FormState } from "@/lib/forms";
import { createClient } from "@/lib/supabase/server";
import { emailWithCaptchaSchema, loginSchema, registerSchema, resetPasswordSchema } from "@/lib/validation/auth";

/** Where auth emails send people back to; the route picks the next page by link type. */
function emailLinkTarget(): string {
  return `${getEnv().SITE_URL}/auth/confirm`;
}

export async function signIn(previous: FormState, formData: FormData): Promise<FormState> {
  const attempt = previous.attempt + 1;
  const values = formValues(formData, ["email"]);
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: fieldErrorsOf(parsed.error), values, attempt };

  const { email, password, captchaToken } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password, options: { captchaToken } });
  if (error) return { status: "error", message: authErrorMessage(error), code: error.code, values, attempt };

  redirect(safeNextPath(formData.get("next")));
}

export async function signUp(previous: FormState, formData: FormData): Promise<FormState> {
  const attempt = previous.attempt + 1;
  const values = formValues(formData, ["fullName", "email", "phone", "country"]);
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: fieldErrorsOf(parsed.error), values, attempt };

  const { fullName, email, password, phone, country, captchaToken } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      captchaToken,
      emailRedirectTo: emailLinkTarget(),
      // Read by the database sign-up trigger, which creates the profile.
      data: { full_name: fullName, phone, country, privacy_accepted: true },
    },
  });
  if (error) return { status: "error", message: authErrorMessage(error), values, attempt };

  // Same answer whether or not the email was already registered (no account enumeration).
  return { status: "success", message: authCopy.register.success, attempt };
}

export async function requestPasswordReset(previous: FormState, formData: FormData): Promise<FormState> {
  const attempt = previous.attempt + 1;
  const values = formValues(formData, ["email"]);
  const parsed = emailWithCaptchaSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: fieldErrorsOf(parsed.error), values, attempt };

  const { email, captchaToken } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: emailLinkTarget(), captchaToken });
  if (error) return { status: "error", message: authErrorMessage(error), values, attempt };

  return { status: "success", message: authCopy.forgotPassword.success, attempt };
}

export async function resendConfirmation(previous: FormState, formData: FormData): Promise<FormState> {
  const attempt = previous.attempt + 1;
  const values = formValues(formData, ["email"]);
  const parsed = emailWithCaptchaSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: fieldErrorsOf(parsed.error), values, attempt };

  const { email, captchaToken } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: emailLinkTarget(), captchaToken },
  });
  if (error) return { status: "error", message: authErrorMessage(error), values, attempt };

  return { status: "success", message: authCopy.resendConfirmation.success, values, attempt };
}

export async function updatePassword(previous: FormState, formData: FormData): Promise<FormState> {
  const attempt = previous.attempt + 1;
  await requireUser("/reset-password");
  const parsed = resetPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: fieldErrorsOf(parsed.error), attempt };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { status: "error", message: authErrorMessage(error), attempt };

  redirect("/account?notice=password-updated");
}

const googleSignInSchema = z.object({
  credential: z.string().min(1),
  nonce: z.string().min(16),
});

/**
 * "Continue with Google": the browser gets an ID token from Google Identity Services and
 * Supabase verifies it (signature, audience = our client ID, and sha256(nonce)).
 * Returns an error message, or redirects on success.
 */
export async function signInWithGoogle(credential: string, nonce: string, next: string): Promise<string> {
  const parsed = googleSignInSchema.safeParse({ credential, nonce });
  if (!parsed.success) return "تعذّر تسجيل الدخول باستخدام Google. حاول مرة أخرى.";

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: parsed.data.credential,
    nonce: parsed.data.nonce,
  });
  if (error) return authErrorMessage(error);

  redirect(safeNextPath(next));
}

/** Second step of every email link: a POST, so link scanners that pre-open URLs can't burn the token. */
export async function confirmEmailLink(formData: FormData): Promise<void> {
  const tokenHash = formData.get("tokenHash");
  const type = formData.get("type");
  if (typeof tokenHash !== "string" || !isEmailLinkType(type)) redirect("/login?notice=link-invalid");

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
  if (error) redirect("/login?notice=link-invalid");

  redirect(type === "recovery" ? "/reset-password" : "/account?notice=email-confirmed");
}
