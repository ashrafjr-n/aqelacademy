import { CourseCard } from "@/components/courses/course-card";
import type { Course } from "@/types/content";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return <p className="rounded-2xl bg-surface p-8 text-center">لا توجد دورات متاحة حاليًا.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}
