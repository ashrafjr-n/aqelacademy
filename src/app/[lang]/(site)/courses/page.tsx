import type { Metadata } from "next";
import { CourseGrid } from "@/components/courses/course-grid";
import { PageHeader } from "@/components/ui/page-header";
import { courseCopy, getCourses } from "@/content/courses";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return { title: courseCopy[await getLocale()].listTitle };
}

export default async function CoursesPage() {
  const locale = await getLocale();

  return (
    <>
      <PageHeader title={courseCopy[locale].listTitle} />
      <section className="container-site py-20">
        <CourseGrid courses={getCourses(locale)} preloadFirst />
      </section>
    </>
  );
}
