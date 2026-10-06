import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/admin", "/api", "/auth", "/reset-password", "/courses/*/book"].flatMap((path) =>
        path === "/admin" || path === "/api" ? [path] : [path, `/en${path}`],
      ),
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
