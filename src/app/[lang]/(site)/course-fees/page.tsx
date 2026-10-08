import { ArrowLeft, Clock, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { cardClassName } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { courseCopy, courseDurationLabel, courseHoursLabel, getCourses } from "@/content/courses";
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
        <p className="text-sm">
          {copy.lastUpdated} <time dateTime={copy.updatedAt}>{formatDate(copy.updatedAt, locale)}</time>
        </p>
        <p className="mt-4 max-w-3xl text-lg leading-loose">{copy.intro}</p>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {courses.map((course) => {
            const href = localePath(locale, `/courses/${course.slug}`);
            return (
              <li key={course.slug} className={`${cardClassName} flex flex-col border-t-2 border-t-gold p-6 sm:p-8`}>
                <h2 className="text-lg font-bold leading-snug text-ink">
                  <Link href={href} className="transition-colors hover:text-gold-dark">
                    {course.title}
                  </Link>
                </h2>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {course.durationWeeks && (
                    <li className="flex items-center gap-1.5">
                      <Clock aria-hidden="true" className="size-4 text-gold" />
                      {courseDurationLabel(course.durationWeeks, locale)}
                    </li>
                  )}
                  <li className="flex items-center gap-1.5">
                    <GraduationCap aria-hidden="true" className="size-4 text-gold" />
                    {courseHoursLabel(course.trainingHours, locale)}
                  </li>
                </ul>
                <p className="mt-8 text-sm">{copy.fee}</p>
                <p className="mt-1 text-4xl font-bold text-ink">{formatPrice(course.priceUsd)}</p>
                <Link
                  href={href}
                  className="group mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-bold text-ink transition-colors hover:text-gold-dark"
                >
                  {courseCopy[locale].details}
                  <ArrowLeft aria-hidden="true" className="size-4 transition-transform ltr:rotate-180 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" />
                </Link>
              </li>
            );
          })}
        </ul>

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
