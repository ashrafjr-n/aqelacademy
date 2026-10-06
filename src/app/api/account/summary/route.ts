import { NextResponse, type NextRequest } from "next/server";
import { getAccountSummary } from "@/lib/dal/account-summary";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * The header's account state (`?locale=ar|en` picks the language of its texts). Read from the
 * client so public pages can stay static (prerendered) instead of rendering the header per request.
 */
export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("locale");
  const summary = await getAccountSummary(isLocale(requested) ? requested : defaultLocale);
  return NextResponse.json(summary, { headers: { "Cache-Control": "private, no-store" } });
}
