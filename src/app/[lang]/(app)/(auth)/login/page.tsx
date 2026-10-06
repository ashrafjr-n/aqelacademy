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
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return { title: authCopy[await getLocale()].login.title };
}

export default async function LoginPage({ searchParams }: PageProps<"/[lang]/login">) {
  const { next, notice } = await searchParams;
  const locale = await getLocale();
  const copy = authCopy[locale];
  const nextPath = safeNextPath(next, localePath(locale, "/account"));
  if (await getCurrentUser()) redirect(nextPath);
  const noticeMessage = getNotice(notice, locale);
  const { TURNSTILE_SITE_KEY, GOOGLE_CLIENT_ID } = getEnv();

  return (
    <>
      <AuthHeading title={copy.login.title} subtitle={copy.login.subtitle} />
      {noticeMessage && (
        <div className="mb-5">
          <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />
        </div>
      )}
      {GOOGLE_CLIENT_ID && (
        <>
          <GoogleSignInButton clientId={GOOGLE_CLIENT_ID} nextPath={nextPath} />
          <AuthDivider label={copy.divider} />
        </>
      )}
      <LoginForm siteKey={TURNSTILE_SITE_KEY} nextPath={nextPath} />
      <div className="mt-6 space-y-2 text-center text-sm">
        <p>
          <Link href={localePath(locale, "/forgot-password")} className="font-semibold text-brand hover:text-brand-dark">
            {copy.login.forgotPassword}
          </Link>
        </p>
        <p>
          {copy.login.noAccount}{" "}
          <Link href={localePath(locale, "/register")} className="font-semibold text-brand hover:text-brand-dark">
            {copy.login.createAccount}
          </Link>
        </p>
      </div>
    </>
  );
}
