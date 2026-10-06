import { z } from "zod";
import { issue } from "@/lib/validation/messages";

export const bookingSchema = z.object({
  courseSlug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  note: z
    .string()
    .trim()
    .max(500, issue("noteTooLong"))
    .transform((value) => value || null),
});
