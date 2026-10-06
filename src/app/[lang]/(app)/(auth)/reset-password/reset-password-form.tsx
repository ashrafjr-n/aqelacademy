"use client";

import { useActionState } from "react";
import { updatePassword } from "@/app/(app)/(auth)/actions";
import { FormAlert } from "@/components/forms/form-alert";
import { PasswordField } from "@/components/forms/password-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { initialFormState } from "@/lib/forms";

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(updatePassword, initialFormState);

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && <FormAlert tone="error" message={state.message} />}
      <PasswordField
        name="password"
        label="كلمة المرور الجديدة"
        autoComplete="new-password"
        hint="10 أحرف على الأقل، وفيها حرف إنجليزي ورقم."
        error={state.fieldErrors?.password}
      />
      <PasswordField
        name="confirmPassword"
        label="تأكيد كلمة المرور"
        autoComplete="new-password"
        error={state.fieldErrors?.confirmPassword}
      />
      <SubmitButton label="حفظ كلمة المرور" pendingLabel="جارٍ الحفظ…" />
    </form>
  );
}
