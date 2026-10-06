import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/app/[lang]/(app)/(auth)/login/login-form";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthHeading } from "@/components/auth/auth-heading";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { FormAlert } from "@/components/forms/form-alert";
import { authCopy } from "@/content/auth";
import { getNotice } from "@/content/notices";
import { safeNextPath } from "@/lib/auth/redirect";
import { getCurrentUser } from "@/lib/dal/session";
import { getEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: authCopy.login.title,
};

export default async function LoginPage({ searchParams }: PageProps<"/[lang]/login">) {
  const { next, notice } = await searchParams;
  const nextPath = safeNextPath(next);
  if (await getCurrentUser()) redirect(nextPath);
  const noticeMessage = getNotice(notice);
  const { TURNSTILE_SITE_KEY, GOOGLE_CLIENT_ID } = getEnv();

  return (
    <>
      <AuthHeading title={authCopy.login.title} subtitle={authCopy.login.subtitle} />
      {noticeMessage && (
        <div className="mb-5">
          <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />
        </div>
      )}
      {GOOGLE_CLIENT_ID && (
        <>
          <GoogleSignInButton clientId={GOOGLE_CLIENT_ID} nextPath={nextPath} />
          <AuthDivider />
        </>
      )}
      <LoginForm siteKey={TURNSTILE_SITE_KEY} nextPath={nextPath} />
      <div className="mt-6 space-y-2 text-center text-sm">
        <p>
          <Link href="/forgot-password" className="font-semibold text-brand hover:text-brand-dark">
            نسيت كلمة المرور؟
          </Link>
        </p>
        <p>
          ليس لديك حساب؟{" "}
          <Link href="/register" className="font-semibold text-brand hover:text-brand-dark">
            أنشئ حسابًا
          </Link>
        </p>
      </div>
    </>
  );
}
