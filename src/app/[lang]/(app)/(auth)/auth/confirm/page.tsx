import type { Metadata } from "next";
import { confirmEmailLink } from "@/app/[lang]/(app)/(auth)/actions";
import { AuthHeading } from "@/components/auth/auth-heading";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { ButtonLink } from "@/components/ui/button-link";
import { authCopy } from "@/content/auth";
import { getNotice } from "@/content/notices";
import { isEmailLinkType } from "@/lib/auth/email-link";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return { title: authCopy[await getLocale()].confirm.title, robots: { index: false } };
}

export default async function ConfirmEmailLinkPage({ searchParams }: PageProps<"/[lang]/auth/confirm">) {
  const { token_hash: tokenHash, type } = await searchParams;
  const locale = await getLocale();
  const copy = authCopy[locale].confirm;
  const link = typeof tokenHash === "string" && isEmailLinkType(type) ? { tokenHash, type } : null;
  const invalidLink = getNotice("link-invalid", locale);

  return (
    <>
      <AuthHeading title={copy.title} subtitle={copy.subtitle} />
      {link ? (
        <form action={confirmEmailLink}>
          <input type="hidden" name="tokenHash" value={link.tokenHash} />
          <input type="hidden" name="type" value={link.type} />
          <SubmitButton label={copy.submit} pendingLabel={copy.pending} />
        </form>
      ) : (
        <div className="space-y-5">
          {invalidLink && <FormAlert tone={invalidLink.tone} message={invalidLink.text} />}
          <div className="text-center">
            <ButtonLink href={localePath(locale, "/login")} variant="outline">
              {copy.backToLogin}
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}
