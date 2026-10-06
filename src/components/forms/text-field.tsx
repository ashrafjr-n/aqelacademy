import type { LucideIcon } from "lucide-react";
import type { HTMLInputTypeAttribute } from "react";
import { describedByOf, FieldShell, fieldIconClassName, fieldIdOf, inputClassName, startIconPadding } from "@/components/forms/field";
import { useLocale } from "@/components/locale-provider";
import { dirOf } from "@/lib/i18n";

interface TextFieldProps {
  name: string;
  label: string;
  icon: LucideIcon;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  /** Latin-only values (email) read better left-to-right. */
  ltr?: boolean;
}

export function TextField({
  name,
  label,
  icon: Icon,
  type = "text",
  autoComplete,
  defaultValue,
  error,
  hint,
  required = false,
  ltr = false,
}: TextFieldProps) {
  const id = fieldIdOf(name);
  const padding = startIconPadding[dirOf(useLocale())];

  return (
    <FieldShell id={id} label={label} optional={!required} error={error} hint={hint}>
      <div className="relative">
        <span className={fieldIconClassName}>
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          required={required}
          dir={ltr ? "ltr" : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedByOf(id, error, hint)}
          className={`${inputClassName} ${padding}`}
        />
      </div>
    </FieldShell>
  );
}
