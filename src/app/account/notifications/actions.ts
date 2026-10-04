"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { markAllMyNotificationsRead, openMyNotification } from "@/lib/dal/notifications";

export async function openNotification(formData: FormData): Promise<void> {
  const parsed = z.uuid().safeParse(formData.get("notificationId"));
  if (!parsed.success) redirect("/account/notifications");
  redirect(await openMyNotification(parsed.data));
}

export async function markAllNotificationsRead(): Promise<void> {
  await markAllMyNotificationsRead();
  revalidatePath("/account/notifications");
}
