"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteMyAccount, updateMyProfile } from "@/lib/dal/profiles";
import { fieldErrorsOf, formValues, type FormState } from "@/lib/forms";
import { getRequestLocale } from "@/lib/locale";
import { createClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/validation/auth";

export async function updateProfile(previous: FormState, formData: FormData): Promise<FormState> {
  const attempt = previous.attempt + 1;
  const locale = await getRequestLocale();
  const values = formValues(formData, ["fullName", "phone", "country"]);
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: fieldErrorsOf(parsed.error, locale), values, attempt };

  await updateMyProfile(parsed.data);
  revalidatePath("/account");
  return { status: "success", message: "تم حفظ بياناتك.", values, attempt };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function deleteAccount(): Promise<void> {
  await deleteMyAccount();
  redirect("/login?notice=account-deleted");
}
