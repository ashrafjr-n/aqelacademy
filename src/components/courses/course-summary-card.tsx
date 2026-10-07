import { Clock, GraduationCap, MessageCircle, Signal, UserRound } from "lucide-react";
import Image from "next/image";
import { CourseBookingAction } from "@/components/courses/course-booking-action";
import { cardClassName } from "@/components/ui/card";
import { courseCopy, courseDurationLabel, courseHoursLabel } from "@/content/courses";
import { formatCourseLevel, formatPrice } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Course } from "@/types/content";

interface CourseSummaryCardProps {
  course: Course;
  /** Shows the title and hides the "book" button (on the booking page itself). */
  bookable?: boolean;
}

export async function CourseSummaryCard({ course, bookable = true }: CourseSummaryCardProps) {
  const locale = await getLocale();
  const copy = courseCopy[locale];
  const questionUrl = whatsappUrl(copy.whatsappPrefill(course.title));
  const details = [
    ...(course.durationWeeks ? [{ id: "duration", icon: Clock, label: copy.duration, value: courseDurationLabel(course.durationWeeks, locale) }] : []),
    { id: "hours", icon: GraduationCap, label: copy.hours, value: courseHoursLabel(course.trainingHours, locale) },
    { id: "level", icon: Signal, label: copy.level, value: formatCourseLevel(course.level, locale) },
    { id: "instructor", icon: UserRound, label: copy.trainer, value: course.instructor.name },
  ];

  return (
    <div className={`${cardClassName} overflow-hidden border-t-2 border-t-gold`}>
      <div className="relative aspect-[16/9] border-b border-line bg-surface">
        <Image src={course.image.src} alt={course.image.alt} fill sizes="(min-width: 1024px) 22rem, 100vw" className="object-cover" />
      </div>
      <div className="p-5 sm:p-6">
        {!bookable && <p className="mb-2 font-bold leading-snug text-ink">{course.title}</p>}
        <p className="text-3xl font-bold text-ink">{formatPrice(course.priceUsd)}</p>
        <dl className="mt-4 divide-y divide-line">
          {details.map(({ id, icon: Icon, label, value }) => (
            <div key={id} className="flex items-center justify-between gap-4 py-3 text-sm">
              <dt className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 text-gold" />
                {label}
              </dt>
              <dd className="font-bold text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        {bookable && <CourseBookingAction courseSlug={course.slug} />}
        <a
          href={questionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 border-t border-line pt-4 text-sm font-bold text-whatsapp-dark hover:underline"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          {copy.whatsappQuestion}
        </a>
      </div>
    </div>
  );
}
