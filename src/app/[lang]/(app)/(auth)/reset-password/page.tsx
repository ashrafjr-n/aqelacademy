import type { Metadata } from "next";
import { ResetPasswordForm } from "@/app/[lang]/(app)/(auth)/reset-password/reset-password-form";
import { AuthHeading } from "@/components/auth/auth-heading";
import { authCopy } from "@/content/auth";
import { requireUser } from "@/lib/dal/session";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return { title: authCopy[await getLocale()].resetPassword.title };
}

export default async function ResetPasswordPage() {
  const locale = await getLocale();
  await requireUser(localePath(locale, "/reset-password"));
  const copy = authCopy[locale].resetPassword;

  return (
    <>
      <AuthHeading title={copy.title} subtitle={copy.subtitle} />
      <ResetPasswordForm />
    </>
  );
}
