import "server-only";
import { z } from "zod";

const envSchema = z.object({
  SITE_URL: z.url(),
  SUPABASE_URL: z.url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  TURNSTILE_SITE_KEY: z.string().min(1),
});

export type ServerEnv = z.infer<typeof envSchema>;

/** Runtime config. On Cloudflare these are Worker variables; locally they come from .env.local. */
export function getEnv(): ServerEnv {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Missing or invalid environment variables: ${parsed.error.issues.map((issue) => issue.path.join(".")).join(", ")}`);
  }
  return parsed.data;
}
