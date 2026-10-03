"use client";

import { Mail } from "lucide-react";
import { useActionState } from "react";
import { requestPasswordReset } from "@/app/(auth)/actions";
import { FieldMessage } from "@/components/forms/field";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { TextField } from "@/components/forms/text-field";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { initialFormState } from "@/lib/forms";

interface ForgotPasswordFormProps {
  siteKey: string;
}

export function ForgotPasswordForm({ siteKey }: ForgotPasswordFormProps) {
  const [state, formAction] = useActionState(requestPasswordReset, initialFormState);

  if (state.status === "success" && state.message) {
    return <FormAlert tone="success" message={state.message} />;
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && <FormAlert tone="error" message={state.message} />}
      <TextField
        name="email"
        label="البريد الإلكتروني"
        icon={Mail}
        type="email"
        autoComplete="email"
        required
        ltr
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email}
      />
      <div>
        <TurnstileWidget key={state.attempt} siteKey={siteKey} />
        <FieldMessage id="field-captcha" error={state.fieldErrors?.captchaToken} />
      </div>
      <SubmitButton label="أرسل الرابط" pendingLabel="جارٍ الإرسال…" />
    </form>
  );
}
