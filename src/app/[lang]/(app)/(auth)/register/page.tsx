import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/app/[lang]/(app)/(auth)/register/register-form";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthHeading } from "@/components/auth/auth-heading";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { authCopy } from "@/content/auth";
import { getCurrentUser } from "@/lib/dal/session";
import { getEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: authCopy.register.title,
};

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/account");
  const { TURNSTILE_SITE_KEY, GOOGLE_CLIENT_ID } = getEnv();

  return (
    <>
      <AuthHeading title={authCopy.register.title} subtitle={authCopy.register.subtitle} />
      {GOOGLE_CLIENT_ID && (
        <>
          <GoogleSignInButton clientId={GOOGLE_CLIENT_ID} nextPath={"/account"} />
          <AuthDivider />
        </>
      )}
      <RegisterForm siteKey={TURNSTILE_SITE_KEY} />
      <p className="mt-6 text-center text-sm">
        لديك حساب؟{" "}
        <Link href="/login" className="font-semibold text-brand hover:text-brand-dark">
          سجّل الدخول
        </Link>
      </p>
    </>
  );
}
