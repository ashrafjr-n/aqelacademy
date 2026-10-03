"use client";

import { Globe, Phone } from "lucide-react";
import { useState } from "react";
import { describedByOf, FieldShell, fieldIconClassName, fieldIdOf, inputClassName } from "@/components/forms/field";
import { countries, dialCodeOf } from "@/content/countries";

interface PhoneCountryFieldsProps {
  defaultCountry?: string;
  /** Saved E.164 number, or the raw value echoed back after a failed submit. */
  defaultPhone?: string;
  countryError?: string;
  phoneError?: string;
}

/** Optional country + phone. The country's dialing code is shown and added on the server. */
export function PhoneCountryFields({ defaultCountry = "", defaultPhone = "", countryError, phoneError }: PhoneCountryFieldsProps) {
  const [country, setCountry] = useState(defaultCountry);
  const dialCode = dialCodeOf(country);
  const defaultDialCode = dialCodeOf(defaultCountry);
  // Show a saved "+962791234567" as "791234567" next to the "+962" prefix.
  const phoneValue = defaultDialCode && defaultPhone.startsWith(`+${defaultDialCode}`) ? defaultPhone.slice(defaultDialCode.length + 1) : defaultPhone;
  const countryId = fieldIdOf("country");
  const phoneId = fieldIdOf("phone");
  const phoneHint = dialCode ? undefined : "اختر الدولة أولًا ليُضاف رمزها تلقائيًا.";

  return (
    <>
      <FieldShell id={countryId} label="الدولة" optional error={countryError}>
        <div className="relative">
          <span className={fieldIconClassName}>
            <Globe aria-hidden="true" className="size-5" />
          </span>
          <select
            id={countryId}
            name="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            aria-invalid={countryError ? true : undefined}
            aria-describedby={describedByOf(countryId, countryError)}
            className={`${inputClassName} pl-4 pr-11`}
          >
            <option value="">— اختر الدولة —</option>
            {countries.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </FieldShell>

      <FieldShell id={phoneId} label="رقم الهاتف" optional error={phoneError} hint={phoneHint}>
        <div className="relative">
          <span className={fieldIconClassName}>
            <Phone aria-hidden="true" className="size-5" />
          </span>
          {dialCode && (
            <span dir="ltr" className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-e border-line pl-4 pr-3 font-semibold text-ink">
              +{dialCode}
            </span>
          )}
          <input
            id={phoneId}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            dir="ltr"
            defaultValue={phoneValue}
            aria-invalid={phoneError ? true : undefined}
            aria-describedby={describedByOf(phoneId, phoneError, phoneHint)}
            className={`${inputClassName} pr-11 ${dialCode ? "pl-20" : "pl-4"}`}
          />
        </div>
      </FieldShell>
    </>
  );
}
