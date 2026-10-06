"use client";

import { ChevronDown, Globe, Phone } from "lucide-react";
import { useState } from "react";
import { describedByOf, FieldShell, fieldIconClassName, fieldIdOf, inputClassName } from "@/components/forms/field";
import { useLocale } from "@/components/locale-provider";
import { countries, dialCodeOf } from "@/content/countries";
import { formsCopy } from "@/content/forms";

interface PhoneCountryFieldsProps {
  defaultCountry?: string;
  /** Saved E.164 number, or the raw value echoed back after a failed submit. */
  defaultPhone?: string;
  countryError?: string;
  phoneError?: string;
}

/** Optional country + phone. The country's dialing code is shown and added on the server. */
export function PhoneCountryFields({ defaultCountry = "", defaultPhone = "", countryError, phoneError }: PhoneCountryFieldsProps) {
  // Only drives the visible "+code" prefix; the select itself stays uncontrolled so React's
  // automatic form reset after a submit restores it to the submitted value.
  const [country, setCountry] = useState(defaultCountry);
  const dialCode = dialCodeOf(country);
  const defaultDialCode = dialCodeOf(defaultCountry);
  // Show a saved "+962791234567" as "791234567" next to the "+962" prefix.
  const phoneValue = defaultDialCode && defaultPhone.startsWith(`+${defaultDialCode}`) ? defaultPhone.slice(defaultDialCode.length + 1) : defaultPhone;
  const countryId = fieldIdOf("country");
  const phoneId = fieldIdOf("phone");
  const locale = useLocale();
  const copy = formsCopy[locale];
  const isRtl = locale === "ar";
  const phoneHint = dialCode ? undefined : copy.phoneHint;
  const options = isRtl ? countries : countries.toSorted((a, b) => a.nameEn.localeCompare(b.nameEn, "en-GB"));
  // The phone input is dir="ltr" on every page: on Arabic pages the start icon sits on its right and the
  // "+code" prefix on its left; on English pages both sit on the left, the prefix after the icon.
  const phonePadding = isRtl ? `pr-11 ${dialCode ? "pl-20" : "pl-4"}` : `pr-4 ${dialCode ? "pl-[6.5rem]" : "pl-11"}`;

  return (
    <>
      <FieldShell id={countryId} label={copy.country} optional error={countryError}>
        <div className="relative">
          <span className={fieldIconClassName}>
            <Globe aria-hidden="true" className="size-5" />
          </span>
          <select
            // React only applies a select's defaultValue on mount: remount when it changes.
            key={defaultCountry}
            id={countryId}
            name="country"
            defaultValue={defaultCountry}
            onChange={(event) => setCountry(event.target.value)}
            aria-invalid={countryError ? true : undefined}
            aria-describedby={describedByOf(countryId, countryError)}
            className={`${inputClassName} appearance-none ps-11 pe-10`}
          >
            <option value="">{copy.countryPlaceholder}</option>
            {options.map((option) => (
              <option key={option.code} value={option.code}>
                {/* Isolated left-to-right so "+962" doesn't flip to "962+" in the RTL list. */}
                {`${isRtl ? option.name : option.nameEn} \u2066+${option.dialCode}\u2069`}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5 text-body/60">
            <ChevronDown aria-hidden="true" className="size-5" />
          </span>
        </div>
      </FieldShell>

      <FieldShell id={phoneId} label={copy.phone} optional error={phoneError} hint={phoneHint}>
        <div className="relative">
          <span className={fieldIconClassName}>
            <Phone aria-hidden="true" className="size-5" />
          </span>
          {dialCode && (
            <span dir="ltr" className={`pointer-events-none absolute inset-y-0 flex items-center border-e border-line pr-3 font-semibold text-ink ${isRtl ? "left-0 pl-4" : "left-11"}`}>
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
            className={`${inputClassName} ${phonePadding}`}
          />
        </div>
      </FieldShell>
    </>
  );
}
