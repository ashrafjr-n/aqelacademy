"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setBookingStatus } from "@/lib/dal/admin";

const bookingStatusSchema = z.enum(["pending", "approved", "rejected"]);

const decisionSchema = z.object({
  bookingId: z.uuid(),
  decision: bookingStatusSchema,
  returnTo: bookingStatusSchema,
});

/** Approve, reject, or reopen a booking, then go back to the list the doctor was on. */
export async function decideBooking(formData: FormData): Promise<void> {
  const parsed = decisionSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/admin/bookings?notice=decision-failed");

  const { bookingId, decision, returnTo } = parsed.data;
  const updated = await setBookingStatus(bookingId, decision);
  revalidatePath("/admin", "layout");
  revalidatePath("/account/bookings");
  redirect(`/admin/bookings?status=${returnTo}&notice=${updated ? `booking-${decision}` : "decision-failed"}`);
}
