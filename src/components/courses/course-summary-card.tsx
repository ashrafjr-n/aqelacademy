import { Clock, GraduationCap, Signal, UserRound } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { formatCourseLevel, formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Course } from "@/types/content";

interface CourseSummaryCardProps {
  course: Course;
}

export function CourseSummaryCard({ course }: CourseSummaryCardProps) {
  const questionUrl = whatsappUrl(`مرحبًا، لدي استفسار عن ${course.title}`);
  const details = [
    { id: "duration", icon: Clock, label: "المدة", value: `${course.durationWeeks} أسابيع` },
    { id: "hours", icon: GraduationCap, label: "عدد الساعات", value: `${course.trainingHours} ساعة تدريبية` },
    { id: "level", icon: Signal, label: "المستوى", value: formatCourseLevel(course.level) },
    { id: "instructor", icon: UserRound, label: "المدرب", value: course.instructor.name },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="relative aspect-[5/3] bg-surface">
        <Image src={course.image.src} alt={course.image.alt} fill sizes="(min-width: 1024px) 22rem, 100vw" className="object-cover" />
      </div>
      <div className="p-6">
        <p className="text-3xl font-extrabold text-ink">{formatPrice(course.priceUsd)}</p>
        <dl className="mt-5 divide-y divide-line">
          {details.map(({ id, icon: Icon, label, value }) => (
            <div key={id} className="flex items-center justify-between gap-4 py-3 text-sm">
              <dt className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 text-brand" />
                {label}
              </dt>
              <dd className="font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 grid">
          <ButtonLink href={`/courses/${course.slug}/book`}>احجز مقعدك الآن</ButtonLink>
        </div>
        <p className="mt-3 text-center text-xs">المقاعد محدودة</p>
        <p className="mt-4 border-t border-line pt-4 text-center text-sm">
          لديك سؤال؟{" "}
          <a href={questionUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-whatsapp hover:underline">
            تواصل معنا عبر واتساب
          </a>
        </p>
      </div>
    </div>
  );
}
