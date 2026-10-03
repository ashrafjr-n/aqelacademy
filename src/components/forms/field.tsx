import type { ReactNode } from "react";

export const inputClassName =
  "block w-full rounded-xl border border-line bg-white py-3 text-ink outline-none transition placeholder:text-body/50 focus:border-brand focus:ring-2 focus:ring-brand/20 aria-invalid:border-danger aria-invalid:ring-danger/10";

/** Icon slot on the physical right (start of the RTL page). Inputs using it need `pr-11`. */
export const fieldIconClassName = "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-body/60";

export function fieldIdOf(name: string): string {
  return `field-${name}`;
}

/** aria-describedby for a field: its error wins over its hint. */
export function describedByOf(id: string, error?: string, hint?: string): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

interface FieldShellProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/** Label + control + hint/error, shared by every form field. */
export function FieldShell({ id, label, optional = false, error, hint, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-ink">
        {label}
        {optional && <span className="ms-1 font-normal text-body">(اختياري)</span>}
      </label>
      {children}
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
