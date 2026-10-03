import { describedByOf, FieldShell, fieldIdOf, inputClassName } from "@/components/forms/field";

interface TextAreaFieldProps {
  name: string;
  label: string;
  maxLength: number;
  defaultValue?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export function TextAreaField({ name, label, maxLength, defaultValue, error, hint, required = false }: TextAreaFieldProps) {
  const id = fieldIdOf(name);

  return (
    <FieldShell id={id} label={label} optional={!required} error={error} hint={hint}>
      <textarea
        id={id}
        name={name}
        rows={4}
        maxLength={maxLength}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedByOf(id, error, hint)}
        className={`${inputClassName} resize-y px-4 leading-relaxed`}
      />
    </FieldShell>
  );
}
