"use client";

import { useActionState } from "react";
import { verifyEmailCode } from "@/app/(app)/(auth)/actions";
import { ResendConfirmation } from "@/components/auth/resend-confirmation";
import { describedByOf, FieldShell, fieldIdOf, inputClassName } from "@/components/forms/field";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { authCopy } from "@/content/auth";
import { initialFormState } from "@/lib/forms";

interface EmailCodeFormProps {
  email: string;
  /** Where to go once the account is active (the user is signed in by then). */
  nextPath: string;
  siteKey: string;
}

/** Activates an email sign-up: the 6-digit code from the confirmation email, plus a way to get a new one. */
export function EmailCodeForm({ email, nextPath, siteKey }: EmailCodeFormProps) {
  const [state, formAction] = useActionState(verifyEmailCode, initialFormState);
  const id = fieldIdOf("code");
  const error = state.fieldErrors?.code;
  const hint = authCopy.emailCode.hint(email);

  return (
    <div className="space-y-5">
      <form action={formAction} noValidate className="space-y-5">
        {state.message && <FormAlert tone="error" message={state.message} />}
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="next" value={nextPath} />
        <FieldShell id={id} label={authCopy.emailCode.label} error={error} hint={hint}>
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
        <SubmitButton label={authCopy.emailCode.submit} pendingLabel={authCopy.emailCode.pending} />
      </form>
      <ResendConfirmation email={email} siteKey={siteKey} />
    </div>
  );
}
