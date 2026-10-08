import type { MetadataRoute } from "next";
import { getArticles } from "@/content/articles";
import { courseSlugs } from "@/content/courses";
import { site } from "@/content/site";
import { localePath } from "@/lib/i18n";

const staticPaths = ["/", "/courses", "/consultations", "/blog", "/about-us", "/faqs", "/contact-us", "/course-fees", "/policy", "/refund-policy", "/register", "/login"];

/** Every public page in both languages, each pointing at its twin (hreflang). */
function entriesFor(path: string, lastModified?: string): MetadataRoute.Sitemap {
  const languages = { ar: `${site.url}${path}`, en: `${site.url}${localePath("en", path)}` };
  return [
    { url: languages.ar, lastModified, alternates: { languages } },
    { url: languages.en, lastModified, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths.flatMap((path) => entriesFor(path)),
    ...courseSlugs.flatMap((slug) => entriesFor(`/courses/${slug}`)),
    ...getArticles("ar").flatMap((article) => entriesFor(`/blog/${article.slug}`, article.publishedAt)),
  ];
}
