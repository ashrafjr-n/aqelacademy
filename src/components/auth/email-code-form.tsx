"use client";

import { useActionState } from "react";
import { requestPasswordReset, resendConfirmation, verifyEmailCode } from "@/app/[lang]/(app)/(auth)/actions";
import { ResendCodeForm } from "@/components/auth/resend-code-form";
import { describedByOf, FieldShell, fieldIdOf, inputClassName } from "@/components/forms/field";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { useLocale } from "@/components/locale-provider";
import { authCopy } from "@/content/auth";
import { initialFormState } from "@/lib/forms";
import type { EmailCodeType } from "@/lib/validation/auth";

// A new code: sign-ups resend the confirmation email, resets request another reset email.
const resendActions = { email: resendConfirmation, recovery: requestPasswordReset } satisfies Record<EmailCodeType, unknown>;

interface EmailCodeFormProps {
  type: EmailCodeType;
  email: string;
  /** Where to go once the account is active (the user is signed in by then). */
  nextPath: string;
  siteKey: string;
}

/** The code from a sign-up or password reset email, plus a way to get a new one. */
export function EmailCodeForm({ type, email, nextPath, siteKey }: EmailCodeFormProps) {
  const [state, formAction] = useActionState(verifyEmailCode, initialFormState);
  const id = fieldIdOf("code");
  const error = state.fieldErrors?.code;
  const copy = authCopy[useLocale()].emailCode;
  const hint = copy.hint(email);

  return (
    <div className="space-y-5">
      <form action={formAction} noValidate className="space-y-5">
        {state.message && <FormAlert tone="error" message={state.message} />}
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="next" value={nextPath} />
        <FieldShell id={id} label={copy.label} error={error} hint={hint}>
          <input
            id={id}
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            dir="ltr"
            required
            // The code step replaces the form the user just submitted: move focus to it.
            autoFocus
            defaultValue={state.values?.code}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedByOf(id, error, hint)}
            className={`${inputClassName} px-4 text-center text-2xl font-bold tracking-[0.5em]`}
          />
        </FieldShell>
        <SubmitButton label={copy.submit[type]} pendingLabel={copy.pending} />
      </form>
      <ResendCodeForm email={email} siteKey={siteKey} action={resendActions[type]} />
    </div>
  );
}
