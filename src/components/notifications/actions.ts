"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { markAllMyNotificationsRead, openMyNotification } from "@/lib/dal/notifications";

export async function openNotification(formData: FormData): Promise<void> {
  const parsed = z.uuid().safeParse(formData.get("notificationId"));
  if (!parsed.success) redirect("/");
  redirect(await openMyNotification(parsed.data));
}

/** The header panel reloads its feed itself afterwards. */
export async function markAllNotificationsRead(): Promise<void> {
  await markAllMyNotificationsRead();
}
