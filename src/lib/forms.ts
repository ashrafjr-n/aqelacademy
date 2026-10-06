import type { z } from "zod";
import type { Locale } from "@/lib/i18n";
import { validationMessage } from "@/lib/validation/messages";

export interface FormState<Field extends string = string> {
  status: "idle" | "error" | "success";
  message?: string;
  /** Machine-readable reason for an error, when the UI needs to react to it. */
  code?: string;
  fieldErrors?: Partial<Record<Field, string>>;
  /** Non-secret inputs echoed back so the form keeps them after a failed submit. */
  values?: Partial<Record<Field, string>>;
  /** Increments on every submit; used to remount one-time widgets such as the captcha. */
  attempt: number;
}

export const initialFormState: FormState = { status: "idle", attempt: 0 };

/** First error message per field, in the visitor's language. */
export function fieldErrorsOf<Field extends string>(error: z.ZodError, locale: Locale): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !(field in errors)) errors[field as Field] = validationMessage(issue.message, locale);
  }
  return errors;
}

/** Reads the given string fields from FormData (missing → ""). */
export function formValues<Field extends string>(formData: FormData, fields: readonly Field[]): Record<Field, string> {
  const values = {} as Record<Field, string>;
  for (const field of fields) {
    const value = formData.get(field);
    values[field] = typeof value === "string" ? value : "";
  }
  return values;
}
