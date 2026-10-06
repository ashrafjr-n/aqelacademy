import { NextResponse, type NextRequest } from "next/server";
import { getCourse } from "@/content/courses";
import { getMyLatestBooking } from "@/lib/dal/bookings";

/**
 * The visitor's latest booking for one course (`?course=<slug>`). Read from the client so course
 * pages can stay static, like the header's account summary.
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("course") ?? "";
  const booking = getCourse(slug) ? await getMyLatestBooking(slug) : null;
  return NextResponse.json({ booking }, { headers: { "Cache-Control": "private, no-store" } });
}
