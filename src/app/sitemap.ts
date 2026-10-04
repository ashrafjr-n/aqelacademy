import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { courses } from "@/content/courses";
import { site } from "@/content/site";

const staticPaths = ["/", "/courses", "/blog", "/about-us", "/faqs", "/contact-us", "/policy", "/register", "/login"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths.map((path) => ({ url: `${site.url}${path}` })),
    ...courses.map((course) => ({ url: `${site.url}/courses/${course.slug}` })),
    ...articles.map((article) => ({ url: `${site.url}/blog/${article.slug}`, lastModified: article.publishedAt })),
  ];
}
