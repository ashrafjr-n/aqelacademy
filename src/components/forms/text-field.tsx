import type { HTMLInputTypeAttribute } from "react";

interface TextFieldProps {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  /** Latin-only values (email, phone, password) read better left-to-right. */
  ltr?: boolean;
}

export const inputClassName =
  "block w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 aria-invalid:border-danger";

export function TextField({ name, label, type = "text", autoComplete, defaultValue, error, hint, required = false, ltr = false }: TextFieldProps) {
  const id = `field-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-semibold text-ink">
        {label}
        {!required && <span className="ms-1 text-sm font-normal">(اختياري)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required={required}
        dir={ltr ? "ltr" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={inputClassName}
      />
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  );
}

interface FieldMessageProps {
  id: string;
  error?: string;
  hint?: string;
}

export function FieldMessage({ id, error, hint }: FieldMessageProps) {
  if (error) {
    return (
      <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${id}-hint`} className="mt-1.5 text-sm">
        {hint}
      </p>
    );
  }
  return null;
}
