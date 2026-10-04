"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { z } from "zod";
import { MESSAGE_MAX_LENGTH, messagesCopy } from "@/content/messages";
import { markConversationRead, sendMessage } from "@/lib/dal/messages";
import { emailNewMessage } from "@/lib/email/notify";
import type { FormState } from "@/lib/forms";

const messageSchema = z.object({
  bookingId: z.uuid(),
  body: z.string().trim().min(1).max(MESSAGE_MAX_LENGTH),
});

export async function sendMessageAction(previous: FormState, formData: FormData): Promise<FormState> {
  const attempt = previous.attempt + 1;
  const parsed = messageSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: messagesCopy.failures.invalid, attempt };

  const { bookingId, body } = parsed.data;
  const result = await sendMessage(bookingId, body);
  if (!result.ok) return { status: "error", message: messagesCopy.failures[result.reason], values: { body }, attempt };

  after(() => emailNewMessage(bookingId));
  revalidatePath(`/account/bookings/${bookingId}`);
  revalidatePath(`/admin/bookings/${bookingId}`);
  revalidatePath("/admin/messages");
  return { status: "success", attempt };
}

/** Called when a conversation is on screen with unread messages from the other side. */
export async function markConversationReadAction(bookingId: string): Promise<void> {
  const parsed = z.uuid().safeParse(bookingId);
  if (!parsed.success) return;
  await markConversationRead(parsed.data);
}
