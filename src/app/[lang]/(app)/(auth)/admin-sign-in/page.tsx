import type { Metadata } from "next";
import { connection } from "next/server";
import { AuthHeading } from "@/components/auth/auth-heading";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { FormAlert } from "@/components/forms/form-alert";
import { authCopy } from "@/content/auth";
import { getEnv } from "@/lib/env";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return { title: authCopy[await getLocale()].adminSignIn.title, robots: { index: false, follow: false } };
}

/** Where admin accounts land when they signed in without Google (see requireAdmin). */
export default async function AdminSignInPage() {
  await connection();
  const { GOOGLE_CLIENT_ID } = getEnv();
  const copy = authCopy[await getLocale()].adminSignIn;

  return (
    <>
      <AuthHeading title={copy.title} subtitle={copy.subtitle} />
      {GOOGLE_CLIENT_ID ? <GoogleSignInButton clientId={GOOGLE_CLIENT_ID} nextPath="/admin" /> : <FormAlert tone="error" message={copy.unavailable} />}
    </>
  );
}
