"use client";

import { Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "@/app/[lang]/(app)/(auth)/actions";
import { EmailCodeForm } from "@/components/auth/email-code-form";
import { FieldMessage } from "@/components/forms/field";
import { FormAlert } from "@/components/forms/form-alert";
import { PasswordField } from "@/components/forms/password-field";
import { PhoneCountryFields } from "@/components/forms/phone-country-fields";
import { SubmitButton } from "@/components/forms/submit-button";
import { TextField } from "@/components/forms/text-field";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { useLocale } from "@/components/locale-provider";
import { authCopy } from "@/content/auth";
import { formsCopy } from "@/content/forms";
import { localePath } from "@/lib/i18n";
import { initialFormState } from "@/lib/forms";

interface RegisterFormProps {
  siteKey: string;
}

export function RegisterForm({ siteKey }: RegisterFormProps) {
  const [state, formAction] = useActionState(signUp, initialFormState);
  const locale = useLocale();
  const copy = authCopy[locale].register;
  const fields = formsCopy[locale];

  if (state.status === "success" && state.message) {
    return (
      <div className="space-y-5">
        <FormAlert tone="success" message={state.message} />
        <EmailCodeForm type="email" email={state.values?.email ?? ""} nextPath={localePath(locale, "/account?notice=email-confirmed")} siteKey={siteKey} />
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && <FormAlert tone="error" message={state.message} />}
      <TextField
        name="fullName"
        label={copy.fullName}
        icon={UserRound}
        autoComplete="name"
        required
        defaultValue={state.values?.fullName}
        error={state.fieldErrors?.fullName}
      />
      <TextField
        name="email"
        label={fields.email}
        icon={Mail}
        type="email"
        autoComplete="email"
        required
        ltr
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email}
      />
      <PasswordField
        name="password"
        label={fields.password}
        autoComplete="new-password"
        hint={copy.passwordHint}
        error={state.fieldErrors?.password}
      />
      <PhoneCountryFields
        defaultCountry={state.values?.country}
        defaultPhone={state.values?.phone}
        countryError={state.fieldErrors?.country}
        phoneError={state.fieldErrors?.phone}
      />
      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="privacy"
            required
            aria-invalid={state.fieldErrors?.privacy ? true : undefined}
            aria-describedby={state.fieldErrors?.privacy ? "field-privacy-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-brand"
          />
          <span>
            {copy.privacyBefore}{" "}
            <Link href={localePath(locale, "/policy")} target="_blank" className="font-bold text-brand underline hover:text-brand-dark">
              {copy.privacyLink}
            </Link>
            {copy.privacyAfter}
          </span>
        </label>
        <FieldMessage id="field-privacy" error={state.fieldErrors?.privacy} />
      </div>
      <div>
        <TurnstileWidget key={state.attempt} siteKey={siteKey} />
        <FieldMessage id="field-captcha" error={state.fieldErrors?.captchaToken} />
      </div>
      <SubmitButton label={copy.submit} pendingLabel={copy.pending} />
    </form>
  );
}
