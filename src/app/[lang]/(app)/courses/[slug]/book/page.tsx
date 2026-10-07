import { Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BookingForm } from "@/app/[lang]/(app)/courses/[slug]/book/booking-form";
import { CourseSummaryCard } from "@/components/courses/course-summary-card";
import { BackLink } from "@/components/ui/back-link";
import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { accountCopy } from "@/content/account";
import { bookingCopy } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { getMyOpenBooking } from "@/lib/dal/bookings";
import { getMyProfile } from "@/lib/dal/profiles";
import { requireUser } from "@/lib/dal/session";

export async function generateMetadata(): Promise<Metadata> {
  return { title: bookingCopy[await getLocale()].bookTitle, robots: { index: false } };
}

export default async function BookCoursePage({ params }: PageProps<"/[lang]/courses/[slug]/book">) {
  const { slug } = await params;
  const locale = await getLocale();
  const course = getCourse(slug, locale);
  if (!course) notFound();
  await requireUser(localePath(locale, `/courses/${slug}/book`));
  const copy = bookingCopy[locale];

  const [openBooking, profile] = await Promise.all([getMyOpenBooking(slug), getMyProfile()]);
  // Already booked: the course page shows where that booking stands.
  if (openBooking) redirect(localePath(locale, `/courses/${course.slug}`));

  return (
    <div className="container-site py-8 sm:py-12">
      <BackLink href={localePath(locale, `/courses/${course.slug}`)} label={course.title} />
      <div className="mt-4">
        <PageTitle title={copy.bookTitle} description={copy.bookIntro} />
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          <Card title={copy.flowTitle}>
            <ol className="grid gap-5 sm:grid-cols-3">
              {copy.flow.map((step, index) => (
                <li key={step.title} className="flex gap-3 sm:flex-col">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-soft text-sm font-bold text-gold-dark ring-1 ring-gold/50">{index + 1}</span>
                  <span>
                    <span className="block font-bold text-ink">{step.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Card>

          <Card title={copy.formTitle}>
            {!profile?.phone && (
              <p className="mb-5 flex items-start gap-2 rounded-xl bg-brand-soft p-4 text-sm leading-relaxed text-ink">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>
                  {copy.phoneTipBefore}{" "}
                  <Link href={localePath(locale, "/account")} className="font-bold text-brand underline hover:text-brand-dark">
                    {accountCopy[locale].title}
                  </Link>
                  {copy.phoneTipAfter}
                </span>
              </p>
            )}
            <BookingForm courseSlug={course.slug} />
            <Link href={localePath(locale, "/refund-policy")} target="_blank" className="mt-4 inline-block text-sm font-bold text-brand underline hover:text-brand-dark">
              {copy.refundNote}
            </Link>
          </Card>
        </div>

        <aside className="lg:sticky lg:top-24">
          <CourseSummaryCard course={course} bookable={false} />
        </aside>
      </div>
    </div>
  );
}
