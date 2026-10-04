import { Clock, GraduationCap, MessageCircle, Signal, UserRound } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClassName } from "@/components/ui/card";
import { formatCourseLevel, formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Course } from "@/types/content";

interface CourseSummaryCardProps {
  course: Course;
  /** Shows the title and hides the "book" button (on the booking page itself). */
  bookable?: boolean;
}

export function CourseSummaryCard({ course, bookable = true }: CourseSummaryCardProps) {
  const questionUrl = whatsappUrl(`مرحبًا، لدي استفسار عن ${course.title}`);
  const details = [
    { id: "duration", icon: Clock, label: "المدة", value: `${course.durationWeeks} أسابيع` },
    { id: "hours", icon: GraduationCap, label: "عدد الساعات", value: `${course.trainingHours} ساعة تدريبية` },
    { id: "level", icon: Signal, label: "المستوى", value: formatCourseLevel(course.level) },
    { id: "instructor", icon: UserRound, label: "المدرب", value: course.instructor.name },
  ];

  return (
    <div className={`${cardClassName} overflow-hidden`}>
      <div className="relative aspect-[16/9] bg-surface">
        <Image src={course.image.src} alt={course.image.alt} fill sizes="(min-width: 1024px) 22rem, 100vw" className="object-cover" />
      </div>
      <div className="p-5 sm:p-6">
        {!bookable && <p className="mb-2 font-bold leading-snug text-ink">{course.title}</p>}
        <p className="text-3xl font-extrabold text-ink">{formatPrice(course.priceUsd)}</p>
        <dl className="mt-4 divide-y divide-line">
          {details.map(({ id, icon: Icon, label, value }) => (
            <div key={id} className="flex items-center justify-between gap-4 py-3 text-sm">
              <dt className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 text-body/60" />
                {label}
              </dt>
              <dd className="font-bold text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        {bookable && (
          <>
            <div className="mt-5 grid">
              <ButtonLink href={`/courses/${course.slug}/book`}>احجز مقعدك الآن</ButtonLink>
            </div>
            <p className="mt-2.5 text-center text-xs">المقاعد محدودة</p>
          </>
        )}
        <a
          href={questionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 border-t border-line pt-4 text-sm font-bold text-whatsapp-dark hover:underline"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          لديك سؤال؟ تواصل معنا عبر واتساب
        </a>
      </div>
    </div>
  );
}
