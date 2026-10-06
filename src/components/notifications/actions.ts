"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { markAllMyNotificationsRead, openMyNotification } from "@/lib/dal/notifications";
import { localePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/locale";

export async function openNotification(formData: FormData): Promise<void> {
  const locale = await getRequestLocale();
  const parsed = z.uuid().safeParse(formData.get("notificationId"));
  if (!parsed.success) redirect(localePath(locale, "/"));
  redirect(await openMyNotification(parsed.data, locale));
}

/** The header panel reloads its feed itself afterwards. */
export async function markAllNotificationsRead(): Promise<void> {
  await markAllMyNotificationsRead();
}
