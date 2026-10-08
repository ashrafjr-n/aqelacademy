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
        <p className="mt-4 max-w-3xl text-lg leading-loose">{copy.intro}</p>

        <div className="mt-10">
          <CourseGrid courses={courses} />
        </div>

        <h2 className="mt-14 font-heading text-2xl font-bold text-ink">{copy.notesTitle}</h2>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 ps-6 text-lg leading-loose marker:text-gold">
          {copy.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
          <li>
            <Link href={localePath(locale, "/refund-policy")} className="font-bold text-gold-dark underline">
              {copy.refundLink}
            </Link>
            .
          </li>
        </ul>
      </div>
    </>
  );
}
