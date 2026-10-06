"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import { bookingCopy } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import { createMyBooking } from "@/lib/dal/bookings";
import { getMyProfile } from "@/lib/dal/profiles";
import { emailNewBooking } from "@/lib/email/notify";
import { fieldErrorsOf, formValues, type FormState } from "@/lib/forms";
import { localePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/locale";
import { bookingSchema } from "@/lib/validation/bookings";

export async function createBooking(previous: FormState, formData: FormData): Promise<FormState> {
  const attempt = previous.attempt + 1;
  const locale = await getRequestLocale();
  const values = formValues(formData, ["note"]);
  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: fieldErrorsOf(parsed.error, locale), values, attempt };

  const { courseSlug, note } = parsed.data;
  if (!getCourse(courseSlug)) return { status: "error", message: bookingCopy[locale].failures.unavailable, values, attempt };

  const result = await createMyBooking(courseSlug, note);
  if (!result.ok) return { status: "error", message: bookingCopy[locale].failures[result.reason], values, attempt };

  after(async () => {
    const profile = await getMyProfile();
    await emailNewBooking(result.bookingId, profile?.full_name ?? "طالب", courseSlug);
  });
  // The course page then shows the booking as sent, and the student gets a "booking sent" notification.
  redirect(localePath(locale, `/courses/${courseSlug}`));
}
