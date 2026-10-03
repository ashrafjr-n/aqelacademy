"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/account/actions";
import { CountrySelect } from "@/components/forms/country-select";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { TextField } from "@/components/forms/text-field";
import { initialFormState } from "@/lib/forms";

interface ProfileFormProps {
  fullName: string;
  phone: string | null;
  country: string | null;
}

export function ProfileForm({ fullName, phone, country }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateProfile, initialFormState);
  const values = state.values ?? { fullName, phone: phone ?? "", country: country ?? "" };

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && <FormAlert tone={state.status === "success" ? "success" : "error"} message={state.message} />}
      <TextField
        name="fullName"
        label="الاسم الكامل"
        autoComplete="name"
        required
        defaultValue={values.fullName}
        error={state.fieldErrors?.fullName}
      />
      <TextField
        name="phone"
        label="رقم الهاتف"
        type="tel"
        autoComplete="tel"
        ltr
        defaultValue={values.phone}
        error={state.fieldErrors?.phone}
      />
      <CountrySelect defaultValue={values.country} error={state.fieldErrors?.country} />
      <SubmitButton label="حفظ التغييرات" pendingLabel="جارٍ الحفظ…" />
    </form>
  );
}
