"use client";

import { useActionState } from "react";
import { resendConfirmation } from "@/app/(auth)/actions";
import { FieldMessage } from "@/components/forms/field";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { authCopy } from "@/content/auth";
import { initialFormState } from "@/lib/forms";

interface ResendConfirmationProps {
  email: string;
  siteKey: string;
}

export function ResendConfirmation({ email, siteKey }: ResendConfirmationProps) {
  const [state, formAction] = useActionState(resendConfirmation, initialFormState);

  if (state.status === "success" && state.message) {
    return <FormAlert tone="success" message={state.message} />;
  }

  return (
    <form action={formAction} className="space-y-3 rounded-2xl border border-line bg-surface p-4">
      <p className="text-sm font-bold text-ink">{authCopy.resendConfirmation.prompt}</p>
      {state.message && <FormAlert tone="error" message={state.message} />}
      <input type="hidden" name="email" value={email} />
      <div>
        <TurnstileWidget key={state.attempt} siteKey={siteKey} />
        <FieldMessage id="field-resend-captcha" error={state.fieldErrors?.captchaToken ?? state.fieldErrors?.email} />
      </div>
      <SubmitButton label="أعد إرسال رابط التأكيد" pendingLabel="جارٍ الإرسال…" variant="outline" />
    </form>
  );
}
