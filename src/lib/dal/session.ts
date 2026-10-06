import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { localeOfPath, localePath } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";

export interface SessionUser {
  id: string;
  email: string;
}

/** The signed-in user, verified from the access token (JWT signature checked). Cached per request. */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub || typeof claims.email !== "string") return null;
  return { id: claims.sub, email: claims.email };
});

/** Signed-out visitors go to the login page in the language of the page they wanted (`nextPath`). */
export async function requireUser(nextPath: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`${localePath(localeOfPath(nextPath), "/login")}?next=${encodeURIComponent(nextPath)}`);
  return user;
}
