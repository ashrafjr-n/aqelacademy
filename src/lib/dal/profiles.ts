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
