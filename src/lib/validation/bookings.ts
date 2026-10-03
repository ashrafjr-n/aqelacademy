import { z } from "zod";

export const bookingSchema = z.object({
  courseSlug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  note: z
    .string()
    .trim()
    .max(500, { error: "الملاحظة طويلة جدًا (500 حرف كحد أقصى)." })
    .transform((value) => value || null),
});
