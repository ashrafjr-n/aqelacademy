import "server-only";
import { requireUser } from "@/lib/dal/session";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type MyProfile = Pick<ProfileRow, "full_name" | "email" | "phone" | "country">;

export interface ProfileUpdate {
  fullName: string;
  phone: string | null;
  country: string | null;
}

/** The signed-in user's own profile (RLS also limits reads to it). */
export async function getMyProfile(): Promise<MyProfile | null> {
  const user = await requireUser("/account");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, email, phone, country")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateMyProfile({ fullName, phone, country }: ProfileUpdate): Promise<void> {
  const user = await requireUser("/account");
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, phone, country })
    .eq("id", user.id);
  if (error) throw error;
}

/** Permanently deletes the signed-in user's account and everything tied to it, then clears the session cookies. */
export async function deleteMyAccount(): Promise<void> {
  await requireUser("/account");
  const supabase = await createClient();
  const { error } = await supabase.rpc("delete_my_account");
  if (error) throw error;
  // The user no longer exists server-side; this just removes the local session cookies.
  await supabase.auth.signOut({ scope: "local" });
}
