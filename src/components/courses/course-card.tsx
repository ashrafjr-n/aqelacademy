import { ArrowLeft, Clock, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cardClassName } from "@/components/ui/card";
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
    <article className={`${cardClassName} group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift`}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={course.image.src}
          alt=""
          fill
          preload={preload}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 start-3 rounded-full bg-white/95 px-3 py-1 text-sm font-extrabold text-ink shadow-sm">{formatPrice(course.priceUsd)}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold text-brand">{course.instructor.name}</p>
        <h3 className="mt-1.5 text-lg font-bold leading-snug text-ink">
          <Link href={href} className="hover:text-brand">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed">{course.excerpt}</p>
        <ul className="mt-4 mb-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li className="flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-4 text-body/60" />
            {course.durationWeeks} أسابيع
          </li>
          <li className="flex items-center gap-1.5">
            <GraduationCap aria-hidden="true" className="size-4 text-body/60" />
            {course.trainingHours} ساعة تدريبية
          </li>
        </ul>
        <div className="mt-auto border-t border-line pt-4">
          <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-dark">
            التفاصيل والحجز
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
