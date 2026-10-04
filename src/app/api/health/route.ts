import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Daily keep-alive target (.github/workflows/keep-alive.yml): one tiny database query, so the
 * free Supabase project never reaches 7 days without activity. Reveals nothing but up/down.
 */
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("health_check");
  const ok = !error && data === true;
  if (error) console.error("Health check failed", { code: error.code });
  return NextResponse.json({ ok }, { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
