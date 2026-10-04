import { CalendarCheck, Clock, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/app/(app)/courses/[slug]/book/booking-form";
import { ButtonLink } from "@/components/ui/button-link";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { bookingCopy, bookingStatuses } from "@/content/bookings";
import { getCourse } from "@/content/courses";
import { getMyOpenBooking } from "@/lib/dal/bookings";
import { getMyProfile } from "@/lib/dal/profiles";
import { requireUser } from "@/lib/dal/session";
import { formatPrice } from "@/lib/format";

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
    <>
      <PageHeader
        title={bookingCopy.bookTitle}
        parents={[
          { href: "/courses", label: "الدورات التدريبية" },
          { href: `/courses/${course.slug}`, label: course.title },
        ]}
      />
      <div className="container-site py-12">
        <div className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-line bg-white p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-surface">
              <Image src={course.image.src} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-snug text-ink">{course.title}</h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="font-bold text-ink">{formatPrice(course.priceUsd)}</span>
                <span className="flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="size-4 text-brand" />
                  {course.durationWeeks} أسابيع
                </span>
              </p>
            </div>
          </div>

          {openBooking && openStatus ? (
            <div className="space-y-4 rounded-2xl bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-bold text-ink">
                  <CalendarCheck aria-hidden="true" className="size-5 text-brand" />
                  {bookingCopy.alreadyBooked}
                </p>
                <StatusBadge tone={openStatus.tone} label={openStatus.label} />
              </div>
              <p className="text-sm leading-relaxed">{openStatus.description}</p>
              <ButtonLink href="/account/bookings" variant="outline">
                عرض حجوزاتي
              </ButtonLink>
            </div>
          ) : (
            <>
              <p className="leading-relaxed">{bookingCopy.bookIntro}</p>
              {!profile?.phone && (
                <p className="flex items-start gap-2 rounded-2xl bg-brand-soft p-4 text-sm leading-relaxed text-ink">
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    {bookingCopy.phoneTip}{" "}
                    <Link href="/account" className="font-bold text-brand underline hover:text-brand-dark">
                      بياناتي
                    </Link>
                  </span>
                </p>
              )}
              <BookingForm courseSlug={course.slug} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
