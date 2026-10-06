import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ForgotPasswordForm } from "@/app/[lang]/(app)/(auth)/forgot-password/forgot-password-form";
import { AuthHeading } from "@/components/auth/auth-heading";
import { authCopy } from "@/content/auth";
import { getEnv } from "@/lib/env";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return { title: authCopy[await getLocale()].forgotPassword.title };
}

export default async function ForgotPasswordPage() {
  // Rendered per request: the captcha site key is a runtime variable, not a build-time one.
  await connection();
  const locale = await getLocale();
  const copy = authCopy[locale].forgotPassword;

  return (
    <>
      <AuthHeading title={copy.title} subtitle={copy.subtitle} />
      <ForgotPasswordForm siteKey={getEnv().TURNSTILE_SITE_KEY} />
      <p className="mt-6 text-center text-sm">
        <Link href={localePath(locale, "/login")} className="font-semibold text-brand hover:text-brand-dark">
          {copy.backToLogin}
        </Link>
      </p>
    </>
  );
}
