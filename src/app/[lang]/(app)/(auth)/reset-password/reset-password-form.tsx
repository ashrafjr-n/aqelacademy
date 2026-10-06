"use client";

import { useActionState } from "react";
import { updatePassword } from "@/app/[lang]/(app)/(auth)/actions";
import { FormAlert } from "@/components/forms/form-alert";
import { PasswordField } from "@/components/forms/password-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { useLocale } from "@/components/locale-provider";
import { authCopy } from "@/content/auth";
import { initialFormState } from "@/lib/forms";

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(updatePassword, initialFormState);
  const locale = useLocale();
  const copy = authCopy[locale].resetPassword;

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && <FormAlert tone="error" message={state.message} />}
      <PasswordField
        name="password"
        label={copy.newPassword}
        autoComplete="new-password"
        hint={authCopy[locale].register.passwordHint}
        error={state.fieldErrors?.password}
      />
      <PasswordField
        name="confirmPassword"
        label={copy.confirmPassword}
        autoComplete="new-password"
        error={state.fieldErrors?.confirmPassword}
      />
      <SubmitButton label={copy.submit} pendingLabel={copy.pending} />
    </form>
  );
}
