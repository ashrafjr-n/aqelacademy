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
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return { title: authCopy[await getLocale()].register.title };
}

export default async function RegisterPage() {
  const locale = await getLocale();
  const copy = authCopy[locale];
  const accountPath = localePath(locale, "/account");
  if (await getCurrentUser()) redirect(accountPath);
  const { TURNSTILE_SITE_KEY, GOOGLE_CLIENT_ID } = getEnv();

  return (
    <>
      <AuthHeading title={copy.register.title} subtitle={copy.register.subtitle} />
      {GOOGLE_CLIENT_ID && (
        <>
          <GoogleSignInButton clientId={GOOGLE_CLIENT_ID} nextPath={accountPath} />
          <AuthDivider label={copy.divider} />
        </>
      )}
      <RegisterForm siteKey={TURNSTILE_SITE_KEY} />
      <p className="mt-6 text-center text-sm">
        {copy.register.haveAccount}{" "}
        <Link href={localePath(locale, "/login")} className="font-semibold text-brand hover:text-brand-dark">
          {copy.register.signIn}
        </Link>
      </p>
    </>
  );
}
