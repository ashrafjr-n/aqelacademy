"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "@/app/(auth)/actions";
import { CountrySelect } from "@/components/forms/country-select";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { FieldMessage, TextField } from "@/components/forms/text-field";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { initialFormState } from "@/lib/forms";

interface RegisterFormProps {
  siteKey: string;
}

export function RegisterForm({ siteKey }: RegisterFormProps) {
  const [state, formAction] = useActionState(signUp, initialFormState);

  if (state.status === "success" && state.message) {
    return <FormAlert tone="success" message={state.message} />;
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && <FormAlert tone="error" message={state.message} />}
      <TextField
        name="fullName"
        label="الاسم الكامل"
        autoComplete="name"
        required
        defaultValue={state.values?.fullName}
        error={state.fieldErrors?.fullName}
      />
      <TextField
        name="email"
        label="البريد الإلكتروني"
        type="email"
        autoComplete="email"
        required
        ltr
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email}
      />
      <TextField
        name="password"
        label="كلمة المرور"
        type="password"
        autoComplete="new-password"
        required
        ltr
        hint="10 أحرف على الأقل، وفيها حرف إنجليزي ورقم."
        error={state.fieldErrors?.password}
      />
      <TextField
        name="phone"
        label="رقم الهاتف"
        type="tel"
        autoComplete="tel"
        ltr
        defaultValue={state.values?.phone}
        error={state.fieldErrors?.phone}
      />
      <CountrySelect defaultValue={state.values?.country} error={state.fieldErrors?.country} />
      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="privacy"
            required
            aria-invalid={state.fieldErrors?.privacy ? true : undefined}
            aria-describedby={state.fieldErrors?.privacy ? "field-privacy-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-brand"
          />
          <span>
            قرأت{" "}
            <Link href="/policy" target="_blank" className="font-semibold text-brand underline hover:text-brand-dark">
              سياسة الخصوصية
            </Link>{" "}
            وأوافق عليها.
          </span>
        </label>
        <FieldMessage id="field-privacy" error={state.fieldErrors?.privacy} />
      </div>
      <div>
        <TurnstileWidget key={state.attempt} siteKey={siteKey} />
        <FieldMessage id="field-captcha" error={state.fieldErrors?.captchaToken} />
      </div>
      <SubmitButton label="إنشاء الحساب" pendingLabel="جارٍ إنشاء الحساب…" />
    </form>
  );
}
