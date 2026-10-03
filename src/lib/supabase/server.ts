import "server-only";
import { cookies } from "next/headers";
import { createSupabaseClient } from "@/lib/supabase/create-client";

/** Supabase client for Server Components, Server Actions and Route Handlers. */
export async function createClient() {
  const cookieStore = await cookies();

  return createSupabaseClient({
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      } catch {
        // Server Components can't write cookies. Safe to skip: middleware refreshes the
        // session before protected pages render, and actions/route handlers can write.
      }
    },
  });
}
