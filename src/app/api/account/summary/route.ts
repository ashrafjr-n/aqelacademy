import { NextResponse } from "next/server";
import { getAccountSummary } from "@/lib/dal/account-summary";

/**
 * The header's account state. Read from the client so public pages can stay static
 * (prerendered) instead of rendering the header per request.
 */
export async function GET() {
  return NextResponse.json(await getAccountSummary(), { headers: { "Cache-Control": "private, no-store" } });
}
