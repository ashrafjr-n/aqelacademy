"use client";

import { useActionState } from "react";
import { FieldMessage } from "@/components/forms/field";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { authCopy } from "@/content/auth";
import { initialFormState, type FormState } from "@/lib/forms";

interface ResendCodeFormProps {
  email: string;
  siteKey: string;
  /** The server action that emails a new code (it reads `email` and `captchaToken`). */
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
}

/** "Didn't get the code?": sends the email again, behind the captcha. */
export function ResendCodeForm({ email, siteKey, action }: ResendCodeFormProps) {
  const [state, formAction] = useActionState(action, initialFormState);

  if (state.status === "success" && state.message) {
    return <FormAlert tone="success" message={state.message} />;
  }

  return (
    <form action={formAction} className="space-y-3 rounded-2xl border border-line bg-surface p-4">
      <p className="text-sm font-bold text-ink">{authCopy.resendCode.prompt}</p>
      {state.message && <FormAlert tone="error" message={state.message} />}
      <input type="hidden" name="email" value={email} />
      <div>
        <TurnstileWidget key={state.attempt} siteKey={siteKey} />
        <FieldMessage id="field-resend-captcha" error={state.fieldErrors?.captchaToken ?? state.fieldErrors?.email} />
      </div>
      <SubmitButton label={authCopy.resendCode.submit} pendingLabel="جارٍ الإرسال…" variant="outline" />
    </form>
  );
}
