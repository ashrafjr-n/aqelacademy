"use client";

import { UserRound } from "lucide-react";
import { useActionState } from "react";
import { updateProfile } from "@/app/[lang]/(app)/account/actions";
import { FormAlert } from "@/components/forms/form-alert";
import { PhoneCountryFields } from "@/components/forms/phone-country-fields";
import { SubmitButton } from "@/components/forms/submit-button";
import { TextField } from "@/components/forms/text-field";
import { useLocale } from "@/components/locale-provider";
import { accountCopy } from "@/content/account";
import { authCopy } from "@/content/auth";
import { initialFormState } from "@/lib/forms";

interface ProfileFormProps {
  fullName: string;
  phone: string | null;
  country: string | null;
}

export function ProfileForm({ fullName, phone, country }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateProfile, initialFormState);
  const values = state.values ?? { fullName, phone: phone ?? "", country: country ?? "" };
  const locale = useLocale();
  const copy = accountCopy[locale];

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && <FormAlert tone={state.status === "success" ? "success" : "error"} message={state.message} />}
      <TextField
        name="fullName"
        label={authCopy[locale].register.fullName}
        icon={UserRound}
        autoComplete="name"
        required
        defaultValue={values.fullName}
        error={state.fieldErrors?.fullName}
      />
      <PhoneCountryFields
        defaultCountry={values.country}
        defaultPhone={values.phone}
        countryError={state.fieldErrors?.country}
        phoneError={state.fieldErrors?.phone}
      />
      <SubmitButton label={copy.saveChanges} pendingLabel={copy.saving} fullWidth={false} />
    </form>
  );
}
