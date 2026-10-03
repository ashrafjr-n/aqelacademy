import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/app/(auth)/forgot-password/forgot-password-form";
import { AuthHeading } from "@/components/auth/auth-heading";
import { authCopy } from "@/content/auth";
import { getEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: authCopy.forgotPassword.title,
};

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeading title={authCopy.forgotPassword.title} subtitle={authCopy.forgotPassword.subtitle} />
      <ForgotPasswordForm siteKey={getEnv().TURNSTILE_SITE_KEY} />
      <p className="mt-6 text-center text-sm">
        <Link href="/login" className="font-semibold text-brand hover:text-brand-dark">
          العودة لتسجيل الدخول
        </Link>
      </p>
    </>
  );
}
