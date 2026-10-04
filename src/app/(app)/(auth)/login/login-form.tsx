"use client";

import { Mail } from "lucide-react";
import { useActionState } from "react";
import { signIn } from "@/app/(app)/(auth)/actions";
import { ResendConfirmation } from "@/app/(app)/(auth)/login/resend-confirmation";
import { FieldMessage } from "@/components/forms/field";
import { FormAlert } from "@/components/forms/form-alert";
import { PasswordField } from "@/components/forms/password-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { TextField } from "@/components/forms/text-field";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { initialFormState } from "@/lib/forms";

interface LoginFormProps {
  siteKey: string;
  nextPath: string;
}

export function LoginForm({ siteKey, nextPath }: LoginFormProps) {
  const [state, formAction] = useActionState(signIn, initialFormState);
  const needsConfirmation = state.code === "email_not_confirmed" && Boolean(state.values?.email);

  return (
    <div className="space-y-5">
      <form action={formAction} noValidate className="space-y-5">
        {state.message && <FormAlert tone="error" message={state.message} />}
        <input type="hidden" name="next" value={nextPath} />
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
        <PasswordField name="password" label="كلمة المرور" autoComplete="current-password" error={state.fieldErrors?.password} />
        <div>
          <TurnstileWidget key={state.attempt} siteKey={siteKey} />
          <FieldMessage id="field-captcha" error={state.fieldErrors?.captchaToken} />
        </div>
        <SubmitButton label="تسجيل الدخول" pendingLabel="جارٍ تسجيل الدخول…" />
      </form>
      {needsConfirmation && <ResendConfirmation email={state.values?.email ?? ""} siteKey={siteKey} />}
    </div>
  );
}
