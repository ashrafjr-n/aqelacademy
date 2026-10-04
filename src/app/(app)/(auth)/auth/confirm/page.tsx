import type { Metadata } from "next";
import { confirmEmailLink } from "@/app/(app)/(auth)/actions";
import { AuthHeading } from "@/components/auth/auth-heading";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { ButtonLink } from "@/components/ui/button-link";
import { authCopy } from "@/content/auth";
import { getNotice } from "@/content/notices";
import { isEmailLinkType } from "@/lib/auth/email-link";

export const metadata: Metadata = {
  title: authCopy.confirm.title,
  robots: { index: false },
};

export default async function ConfirmEmailLinkPage({ searchParams }: PageProps<"/auth/confirm">) {
  const { token_hash: tokenHash, type } = await searchParams;
  const link = typeof tokenHash === "string" && isEmailLinkType(type) ? { tokenHash, type } : null;
  const invalidLink = getNotice("link-invalid");

  return (
    <>
      <AuthHeading title={authCopy.confirm.title} subtitle={authCopy.confirm.subtitle} />
      {link ? (
        <form action={confirmEmailLink}>
          <input type="hidden" name="tokenHash" value={link.tokenHash} />
          <input type="hidden" name="type" value={link.type} />
          <SubmitButton label="تأكيد ومتابعة" pendingLabel="جارٍ التأكيد…" />
        </form>
      ) : (
        <div className="space-y-5">
          {invalidLink && <FormAlert tone={invalidLink.tone} message={invalidLink.text} />}
          <div className="text-center">
            <ButtonLink href="/login" variant="outline">
              العودة لتسجيل الدخول
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}
