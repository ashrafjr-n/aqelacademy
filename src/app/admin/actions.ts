"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { z } from "zod";
import { setBookingStatus } from "@/lib/dal/admin";
import { emailBookingDecision } from "@/lib/email/notify";

const bookingStatusSchema = z.enum(["pending", "approved", "rejected"]);

const decisionSchema = z.object({
  bookingId: z.uuid(),
  decision: bookingStatusSchema,
  /** A list filter to go back to, or "detail" for the booking's own page. */
  returnTo: z.union([bookingStatusSchema, z.literal("detail")]),
});

/** Approve, reject, or reopen a booking, then go back to the list the doctor was on. */
export async function decideBooking(formData: FormData): Promise<void> {
  const parsed = decisionSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/admin/bookings?notice=decision-failed");

  const { bookingId, decision, returnTo } = parsed.data;
  const result = await setBookingStatus(bookingId, decision);
  if (result.outcome === "changed") after(() => emailBookingDecision(result.booking, decision));
  revalidatePath("/admin", "layout");
  revalidatePath("/account/bookings");
  const notice = result.outcome === "missing" ? "decision-failed" : `booking-${decision}`;
  redirect(returnTo === "detail" ? `/admin/bookings/${bookingId}?notice=${notice}` : `/admin/bookings?status=${returnTo}&notice=${notice}`);
}
