import type { Metadata } from "next";
import { ResetPasswordForm } from "@/app/(auth)/reset-password/reset-password-form";
import { AuthHeading } from "@/components/auth/auth-heading";
import { authCopy } from "@/content/auth";
import { requireUser } from "@/lib/dal/session";

export const metadata: Metadata = {
  title: authCopy.resetPassword.title,
};

export default async function ResetPasswordPage() {
  await requireUser("/reset-password");

  return (
    <>
      <AuthHeading title={authCopy.resetPassword.title} subtitle={authCopy.resetPassword.subtitle} />
      <ResetPasswordForm />
    </>
  );
}
