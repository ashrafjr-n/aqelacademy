import "server-only";
import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { getEnv } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Shared factory for every server-side Supabase client (pages, actions, middleware).
 * Auth cookies are httpOnly: no browser code ever reads the session.
 */
export function createSupabaseClient(cookies: CookieMethodsServer) {
  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = getEnv();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  });
}
