import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { courseSlugs } from "@/content/courses";
import { site } from "@/content/site";

const staticPaths = ["/", "/courses", "/blog", "/about-us", "/faqs", "/contact-us", "/policy", "/register", "/login"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths.map((path) => ({ url: `${site.url}${path}` })),
    ...courseSlugs.map((slug) => ({ url: `${site.url}/courses/${slug}` })),
    ...articles.map((article) => ({ url: `${site.url}/blog/${article.slug}`, lastModified: article.publishedAt })),
  ];
}
