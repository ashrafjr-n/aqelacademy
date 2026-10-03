import { FieldMessage, inputClassName } from "@/components/forms/text-field";
import { countries } from "@/content/countries";

interface CountrySelectProps {
  defaultValue?: string;
  error?: string;
}

export function CountrySelect({ defaultValue = "", error }: CountrySelectProps) {
  const id = "field-country";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-semibold text-ink">
        الدولة <span className="ms-1 text-sm font-normal">(اختياري)</span>
      </label>
      <select
        id={id}
        name="country"
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClassName}
      >
        <option value="">— اختر الدولة —</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <FieldMessage id={id} error={error} />
    </div>
  );
}
