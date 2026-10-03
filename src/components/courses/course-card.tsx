import { Clock, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Course } from "@/types/content";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const href = `/courses/${course.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative aspect-[5/3] overflow-hidden bg-surface">
        <Image
          src={course.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm">بواسطة {course.instructor.name}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
          <Link href={href} className="hover:text-brand">
            {course.title}
          </Link>
        </h3>
        <ul className="mt-4 mb-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li className="flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-4 text-brand" />
            {course.durationWeeks} أسابيع
          </li>
          <li className="flex items-center gap-1.5">
            <GraduationCap aria-hidden="true" className="size-4 text-brand" />
            {course.trainingHours} ساعة تدريبية
          </li>
        </ul>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span className="text-lg font-bold text-ink">{formatPrice(course.priceUsd)}</span>
          <Link href={href} className="text-sm font-bold text-brand hover:text-brand-dark">
            المزيد
          </Link>
        </div>
      </div>
    </article>
  );
}
