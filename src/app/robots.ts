import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/admin", "/api", "/auth", "/reset-password", "/courses/*/book"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
