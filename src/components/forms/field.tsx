import type { ReactNode } from "react";
import { useLocale } from "@/components/locale-provider";
import { formsCopy } from "@/content/forms";

export const inputClassName =
  "block w-full rounded-lg border border-line bg-white py-3 text-ink shadow-xs outline-none transition placeholder:text-body/50 hover:border-ink/25 focus:border-brand focus:ring-4 focus:ring-brand/10 aria-invalid:border-danger aria-invalid:ring-danger/10";

/** Icon slot at the start of the field. Inputs using it need room on that side (see `startIconPadding`). */
export const fieldIconClassName = "pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-body/60";

/**
 * Room for the start icon. Physical sides on purpose: Latin inputs carry dir="ltr" even on Arabic
 * pages, and logical padding would follow the input's direction instead of the page's.
 */
export const startIconPadding = { rtl: "pr-11 pl-4", ltr: "pl-11 pr-4" } as const;

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

/** Label + control + hint/error, shared by every form field. Rendered inside client forms (it reads the locale). */
export function FieldShell({ id, label, optional = false, error, hint, children }: FieldShellProps) {
  const copy = formsCopy[useLocale()];

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-ink">
        {label}
        {optional && <span className="ms-1 font-normal text-body">{copy.optional}</span>}
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
