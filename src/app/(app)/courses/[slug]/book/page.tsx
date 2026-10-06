import { CalendarCheck, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/app/(app)/courses/[slug]/book/booking-form";
import { CourseSummaryCard } from "@/components/courses/course-summary-card";
import { BackLink } from "@/components/ui/back-link";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { StatusBadge } from "@/components/ui/status-badge";
import { accountSections } from "@/content/account";
import { bookingCopy, bookingFlow, bookingStatuses } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import { getMyOpenBooking } from "@/lib/dal/bookings";
import { getMyProfile } from "@/lib/dal/profiles";
import { requireUser } from "@/lib/dal/session";

export const metadata: Metadata = {
  title: bookingCopy.bookTitle,
  robots: { index: false },
};

export default async function BookCoursePage({ params }: PageProps<"/courses/[slug]/book">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  await requireUser(`/courses/${slug}/book`);

  const [openBooking, profile] = await Promise.all([getMyOpenBooking(slug), getMyProfile()]);
  const openStatus = openBooking ? bookingStatuses[openBooking.status] : null;

  return (
    <div className="container-site py-8 sm:py-12">
      <BackLink href={`/courses/${course.slug}`} label={course.title} />
      <div className="mt-4">
        <PageTitle title={bookingCopy.bookTitle} description={bookingCopy.bookIntro} />
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          {openBooking && openStatus ? (
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-bold text-ink">
                  <CalendarCheck aria-hidden="true" className="size-5 text-brand" />
                  {bookingCopy.alreadyBooked}
                </p>
                <StatusBadge tone={openStatus.tone} label={openStatus.label} />
              </div>
              <p className="mt-3 leading-relaxed">{openStatus.description}</p>
              <div className="mt-5">
                <ButtonLink href={accountSections.bookings.href} variant="outline">
                  عرض حجوزاتي
                </ButtonLink>
              </div>
            </Card>
          ) : (
            <>
              <Card title={bookingCopy.flowTitle}>
                <ol className="grid gap-5 sm:grid-cols-3">
                  {bookingFlow.map((step, index) => (
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

              <Card title={bookingCopy.formTitle}>
                {!profile?.phone && (
                  <p className="mb-5 flex items-start gap-2 rounded-xl bg-brand-soft p-4 text-sm leading-relaxed text-ink">
                    <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>
                      {bookingCopy.phoneTip}{" "}
                      <Link href={accountSections.profile.href} className="font-bold text-brand underline hover:text-brand-dark">
                        {accountSections.profile.label}
                      </Link>
                    </span>
                  </p>
                )}
                <BookingForm courseSlug={course.slug} />
              </Card>
            </>
          )}
        </div>

        <aside className="lg:sticky lg:top-24">
          <CourseSummaryCard course={course} bookable={false} />
        </aside>
      </div>
    </div>
  );
}
