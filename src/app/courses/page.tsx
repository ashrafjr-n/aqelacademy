import type { Metadata } from "next";
import { CourseGrid } from "@/components/courses/course-grid";
import { PageHeader } from "@/components/ui/page-header";
import { courses } from "@/content/courses";

export const metadata: Metadata = {
  title: "الدورات التدريبية",
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="الدورات التدريبية" />
      <section className="container-site py-16">
        <CourseGrid courses={courses} />
      </section>
    </>
  );
}
