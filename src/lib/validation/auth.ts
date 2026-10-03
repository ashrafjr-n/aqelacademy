import { z } from "zod";
import { countries } from "@/content/countries";

const countryCodes = countries.map((country) => country.code);

export const fullNameSchema = z
  .string()
  .trim()
  .min(2, { error: "الاسم قصير جدًا." })
  .max(100, { error: "الاسم طويل جدًا." });

export const emailSchema = z.preprocess(
  (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
  z.email({ error: "أدخل بريدًا إلكترونيًا صحيحًا." }).max(254, { error: "البريد الإلكتروني طويل جدًا." }),
);

/** Matches the Supabase project policy: 10+ chars, at least one letter and one digit. */
export const newPasswordSchema = z
  .string()
  .min(10, { error: "كلمة المرور يجب أن تكون 10 أحرف على الأقل." })
  .max(72, { error: "كلمة المرور طويلة جدًا (72 حرفًا كحد أقصى)." })
  .regex(/[A-Za-z]/, { error: "كلمة المرور يجب أن تحتوي على حرف إنجليزي واحد على الأقل." })
  .regex(/[0-9]/, { error: "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل." });

/** Optional; stored in E.164 (e.g. +962791234567). Spaces and dashes are ignored. */
export const phoneSchema = z
  .string()
  .transform((value) => value.replace(/[\s-]/g, ""))
  .refine((value) => value === "" || /^\+[1-9][0-9]{6,14}$/.test(value), {
    error: "اكتب الرقم مع رمز الدولة، مثل ‎+962791234567.",
  })
  .transform((value) => value || null);

export const countrySchema = z
  .string()
  .refine((value) => value === "" || countryCodes.includes(value), { error: "اختر دولة من القائمة." })
  .transform((value) => value || null);

const captchaTokenSchema = z.string().min(1, { error: "يرجى إكمال التحقق أولًا." });

export const registerSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  password: newPasswordSchema,
  phone: phoneSchema,
  country: countrySchema,
  privacy: z.literal("on", { error: "يجب الموافقة على سياسة الخصوصية للمتابعة." }),
  captchaToken: captchaTokenSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { error: "أدخل كلمة المرور." }),
  captchaToken: captchaTokenSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
  captchaToken: captchaTokenSchema,
});

export const resetPasswordSchema = z
  .object({ password: newPasswordSchema, confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    error: "كلمتا المرور غير متطابقتين.",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fullName: fullNameSchema,
  phone: phoneSchema,
  country: countrySchema,
});
