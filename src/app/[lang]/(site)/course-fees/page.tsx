import type { Metadata } from "next";
import Link from "next/link";
import { CourseGrid } from "@/components/courses/course-grid";
import { PageHeader } from "@/components/ui/page-header";
import { getCourses } from "@/content/courses";
import { feesCopy } from "@/content/fees";
import { formatDate } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: feesCopy[locale].title, alternates: languageAlternates(locale, "/course-fees") };
}

export default async function CourseFeesPage() {
  const locale = await getLocale();
  const copy = feesCopy[locale];
  const courses = getCourses(locale);

  return (
    <>
      <PageHeader title={copy.title} />
      <div className="container-site py-20">
        <p className="text-sm">
          {copy.lastUpdated} <time dateTime={copy.updatedAt}>{formatDate(copy.updatedAt, locale)}</time>
        </p>
        <div className="mt-8">
          <CourseGrid courses={courses} />
        </div>

        <p className="mt-10 text-lg">
          <Link href={localePath(locale, "/refund-policy")} className="font-bold text-gold-dark underline">
            {copy.refundLink}
          </Link>
        </p>
      </div>
    </>
  );
}
