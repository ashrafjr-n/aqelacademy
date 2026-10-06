import { z } from "zod";
import { EMAIL_CODE_LENGTH } from "@/content/auth";
import { countries, dialCodeOf } from "@/content/countries";
import { issue, type ValidationKey } from "@/lib/validation/messages";

const countryCodes = countries.map((country) => country.code);

const fullNameSchema = z
  .string()
  .trim()
  .min(2, issue("nameTooShort"))
  .max(100, issue("nameTooLong"));

const emailSchema = z.preprocess(
  (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
  z.email(issue("emailInvalid")).max(254, issue("emailTooLong")),
);

/** Matches the Supabase project policy: 10+ chars, at least one letter and one digit. */
const newPasswordSchema = z
  .string()
  .min(10, issue("passwordTooShort"))
  .max(72, issue("passwordTooLong"))
  .regex(/[A-Za-z]/, issue("passwordNeedsLetter"))
  .regex(/[0-9]/, issue("passwordNeedsDigit"));

/** Optional phone as typed: local ("0791…") or international ("+962…" / "00962…"). Normalized by `withE164Phone`. */
const phoneInputSchema = z
  .string()
  .transform((value) => value.replace(/[\s\-().]/g, ""))
  .refine((value) => value === "" || /^(\+|00)?[0-9]{6,15}$/.test(value), issue("phoneInvalid"));

const countrySchema = z
  .string()
  .refine((value) => value === "" || countryCodes.includes(value), issue("countryInvalid"))
  .transform((value) => value || null);

const captchaTokenSchema = z.string().min(1, issue("captchaPending"));

/** Phone keyboards may type Arabic-Indic digits (٠-٩ or ۰-۹); codes are checked as Latin digits. */
function toLatinDigits(value: string): string {
  return value
    .replace(/[\u0660-\u0669]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0));
}

/** The code from a sign-up or password reset email. */
const emailCodeInputSchema = z
  .string()
  .transform((value) => toLatinDigits(value).replace(/\s/g, ""))
  .pipe(z.string().regex(new RegExp(`^[0-9]{${EMAIL_CODE_LENGTH}}$`), issue("codeFormat")));

interface ContactInput {
  phone: string;
  country: string | null;
}

/** Turns the typed phone into E.164 (+962791234567), using the chosen country for local numbers. */
function withE164Phone<T extends ContactInput>(data: T, ctx: z.RefinementCtx): Omit<T, "phone"> & { phone: string | null } {
  const { phone, country } = data;
  if (phone === "") return { ...data, phone: null };

  const dialCode = dialCodeOf(country);
  let international: string | undefined;
  if (phone.startsWith("+")) international = phone;
  else if (phone.startsWith("00")) international = `+${phone.slice(2)}`;
  else if (dialCode) international = `+${dialCode}${phone.replace(/^0+/, "")}`;

  if (!international) {
    ctx.addIssue({ code: "custom", path: ["phone"], message: "phoneNeedsCountry" satisfies ValidationKey });
    return z.NEVER;
  }
  if (!/^\+[1-9][0-9]{6,14}$/.test(international)) {
    ctx.addIssue({ code: "custom", path: ["phone"], message: "phoneInvalid" satisfies ValidationKey });
    return z.NEVER;
  }
  return { ...data, phone: international };
}

export const registerSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: newPasswordSchema,
    phone: phoneInputSchema,
    country: countrySchema,
    privacy: z.literal("on", issue("privacyRequired")),
    captchaToken: captchaTokenSchema,
  })
  .transform(withE164Phone);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, issue("passwordRequired")),
  captchaToken: captchaTokenSchema,
});

/** Password reset request and "resend confirmation code". */
export const emailWithCaptchaSchema = z.object({
  email: emailSchema,
  captchaToken: captchaTokenSchema,
});

/** "email" activates a sign-up; "recovery" starts a password reset. */
export const emailCodeTypes = ["email", "recovery"] as const;
export type EmailCodeType = (typeof emailCodeTypes)[number];

export const emailCodeSchema = z.object({
  email: emailSchema,
  code: emailCodeInputSchema,
  type: z.enum(emailCodeTypes),
});

export const resetPasswordSchema = z
  .object({ password: newPasswordSchema, confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    ...issue("passwordsDontMatch"),
    path: ["confirmPassword"],
  });

export const profileSchema = z
  .object({
    fullName: fullNameSchema,
    phone: phoneInputSchema,
    country: countrySchema,
  })
  .transform(withE164Phone);
