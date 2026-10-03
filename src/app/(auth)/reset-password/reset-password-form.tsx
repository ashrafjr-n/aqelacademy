"use client";

import { useActionState } from "react";
import { updatePassword } from "@/app/(auth)/actions";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { TextField } from "@/components/forms/text-field";
import { initialFormState } from "@/lib/forms";

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(updatePassword, initialFormState);

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && <FormAlert tone="error" message={state.message} />}
      <TextField
        name="password"
        label="كلمة المرور الجديدة"
        type="password"
        autoComplete="new-password"
        required
        ltr
        hint="10 أحرف على الأقل، وفيها حرف إنجليزي ورقم."
        error={state.fieldErrors?.password}
      />
      <TextField
        name="confirmPassword"
        label="تأكيد كلمة المرور"
        type="password"
        autoComplete="new-password"
        required
        ltr
        error={state.fieldErrors?.confirmPassword}
      />
      <SubmitButton label="حفظ كلمة المرور" pendingLabel="جارٍ الحفظ…" />
    </form>
  );
}
