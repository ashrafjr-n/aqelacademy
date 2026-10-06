import { ArrowLeft, Clock, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cardClassName } from "@/components/ui/card";
import { courseDurationLabel, courseHoursLabel } from "@/content/courses";
import { formatPrice } from "@/lib/format";
import type { Course } from "@/types/content";

interface CourseCardProps {
  course: Course;
  /** Loads the image eagerly: for the first card when it's the page's main image. */
  preload?: boolean;
}

export function CourseCard({ course, preload = false }: CourseCardProps) {
  const href = `/courses/${course.slug}`;

  return (
    <article className={`${cardClassName} group flex flex-col overflow-hidden transition-shadow hover:shadow-lift`}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface">
        <Image src={course.image.src} alt="" fill preload={preload} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold text-gold-dark">{course.instructor.name}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
          <Link href={href} className="transition-colors hover:text-gold-dark">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed">{course.excerpt}</p>
        <ul className="mt-4 mb-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li className="flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-4 text-gold" />
            {courseDurationLabel(course.durationWeeks)}
          </li>
          <li className="flex items-center gap-1.5">
            <GraduationCap aria-hidden="true" className="size-4 text-gold" />
            {courseHoursLabel(course.trainingHours)}
          </li>
        </ul>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-4">
          <p className="text-lg font-bold text-ink">{formatPrice(course.priceUsd)}</p>
          <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-gold-dark">
            التفاصيل والحجز
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
