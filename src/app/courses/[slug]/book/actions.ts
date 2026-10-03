"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { bookingCopy } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import { createMyBooking } from "@/lib/dal/bookings";
import { fieldErrorsOf, formValues, type FormState } from "@/lib/forms";
import { bookingSchema } from "@/lib/validation/bookings";

export async function createBooking(previous: FormState, formData: FormData): Promise<FormState> {
  const attempt = previous.attempt + 1;
  const values = formValues(formData, ["note"]);
  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: fieldErrorsOf(parsed.error), values, attempt };

  const { courseSlug, note } = parsed.data;
  if (!getCourse(courseSlug)) return { status: "error", message: bookingCopy.failures.unavailable, values, attempt };

  const result = await createMyBooking(courseSlug, note);
  if (!result.ok) return { status: "error", message: bookingCopy.failures[result.reason], values, attempt };

  revalidatePath("/account/bookings");
  redirect("/account/bookings?notice=booking-created");
}
