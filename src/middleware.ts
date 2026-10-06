import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_HEADER, localeOfPath, localePath, pathWithoutLocale } from "@/lib/i18n";
import { createSupabaseClient } from "@/lib/supabase/create-client";

// Kept as `middleware` (edge runtime) on purpose: Next 16 `proxy` is Node-only,
// which OpenNext on Cloudflare doesn't officially support.

/** Pages that need a session, as locale-free paths. */
const protectedPaths = [/^\/account(\/|$)/, /^\/admin(\/|$)/, /^\/reset-password$/, /^\/courses\/[^/]+\/book$/];

/**
 * 1. Locale routing: every page lives under app/[lang]. English URLs already carry /en; Arabic URLs
 *    keep their original form and are rewritten to /ar internally. The dashboard (/admin) is Arabic
 *    only and sits outside [lang]. Every forwarded request carries the locale in a header, for
 *    Server Actions (they can't read root params).
 * 2. Protected pages: refreshes the Supabase session before they render (Server Components can't
 *    write cookies) and sends signed-out visitors to the login page in their language.
 *    Not a security boundary: every page and action checks the user again via the DAL.
 */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // "/ar/…" is internal only; the public Arabic URL has no prefix.
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    return NextResponse.redirect(new URL(`${pathWithoutLocale(pathname)}${search}`, request.url), 308);
  }

  const locale = localeOfPath(pathname);
  const path = pathWithoutLocale(pathname);
  const isDashboard = /^\/admin(\/|$)/.test(path);

  // Built on demand so it picks up refreshed session cookies.
  function forward(): NextResponse {
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, locale);
    if (locale === "en" || isDashboard) return NextResponse.next({ request: { headers } });
    return NextResponse.rewrite(new URL(`/ar${pathname === "/" ? "" : pathname}${search}`, request.url), { request: { headers } });
  }

  let response = forward();
  if (!protectedPaths.some((pattern) => pattern.test(path))) return response;

  const supabase = createSupabaseClient({
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet, headers) {
      cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
      response = forward();
      cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
    },
  });

  // Must run right after creating the client: it validates and refreshes the session.
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    const loginUrl = new URL(localePath(isDashboard ? "ar" : locale, "/login"), request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Every page; not API routes, Next internals or files with an extension (images, robots.txt, sitemap.xml…).
  matcher: ["/((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).*)"],
};
