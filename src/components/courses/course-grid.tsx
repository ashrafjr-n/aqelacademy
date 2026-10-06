import { CourseCard } from "@/components/courses/course-card";
import { courseCopy } from "@/content/courses";
import { getLocale } from "@/lib/locale";
import type { Course } from "@/types/content";

interface CourseGridProps {
  courses: Course[];
  /** The grid opens the page, so its first image is the main one: load it eagerly. */
  preloadFirst?: boolean;
}

export async function CourseGrid({ courses, preloadFirst = false }: CourseGridProps) {
  if (courses.length === 0) {
    return <p className="rounded-xl border border-line bg-canvas p-8 text-center">{courseCopy[await getLocale()].empty}</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => (
        <CourseCard key={course.slug} course={course} preload={preloadFirst && index === 0} />
      ))}
    </div>
  );
}
