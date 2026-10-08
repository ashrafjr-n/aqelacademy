import type { Metadata } from "next";
import Link from "next/link";
import { cardClassName } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { courseHoursLabel, getCourses } from "@/content/courses";
import { feesCopy } from "@/content/fees";
import { formatDate, formatPrice } from "@/lib/format";
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
        <article className="mx-auto max-w-3xl">
          <p className="mb-8 text-sm">
            {copy.lastUpdated} <time dateTime={copy.updatedAt}>{formatDate(copy.updatedAt, locale)}</time>
          </p>
          <p className="mb-8 text-lg leading-loose">{copy.intro}</p>

          <div className={`${cardClassName} overflow-x-auto`}>
            <table className="w-full text-start">
              <thead className="bg-canvas text-sm text-ink">
                <tr>
                  <th scope="col" className="px-5 py-4 text-start font-bold">{copy.course}</th>
                  <th scope="col" className="px-5 py-4 text-start font-bold">{copy.hours}</th>
                  <th scope="col" className="px-5 py-4 text-end font-bold">{copy.fee}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {courses.map((course) => (
                  <tr key={course.slug}>
                    <th scope="row" className="px-5 py-4 text-start font-bold text-ink">
                      <Link href={localePath(locale, `/courses/${course.slug}`)} className="hover:text-gold-dark hover:underline">
                        {course.title}
                      </Link>
                    </th>
                    <td className="px-5 py-4 whitespace-nowrap">{courseHoursLabel(course.trainingHours, locale)}</td>
                    <td className="px-5 py-4 text-end text-lg font-bold whitespace-nowrap text-ink">{formatPrice(course.priceUsd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-12 font-heading text-2xl font-bold text-ink">{copy.notesTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 ps-6 text-lg leading-loose marker:text-gold">
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
        </article>
      </div>
    </>
  );
}
