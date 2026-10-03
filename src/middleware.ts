import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseClient } from "@/lib/supabase/create-client";

// Kept as `middleware` (edge runtime) on purpose: Next 16 `proxy` is Node-only,
// which OpenNext on Cloudflare doesn't officially support.
//
// Refreshes the Supabase session before protected pages render (Server Components
// can't write cookies) and sends signed-out visitors to the login page.
// Not a security boundary: every page and action checks the user again via the DAL.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createSupabaseClient({
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet, headers) {
      cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
      response = NextResponse.next({ request });
      cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
    },
  });

  // Must run right after creating the client: it validates and refreshes the session.
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/account/:path*", "/reset-password"],
};
