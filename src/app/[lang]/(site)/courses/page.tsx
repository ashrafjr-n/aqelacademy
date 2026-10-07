import type { Metadata } from "next";
import { CourseGrid } from "@/components/courses/course-grid";
import { PageHeader } from "@/components/ui/page-header";
import { courseCopy, getCourses } from "@/content/courses";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: courseCopy[locale].listTitle, alternates: languageAlternates(locale, "/courses") };
}

export default async function CoursesPage() {
  const locale = await getLocale();
  const copy = courseCopy[locale];

  return (
    <>
      <PageHeader title={copy.listTitle} />
      <section className="container-site py-20">
        <p className="mb-12 max-w-3xl text-lg leading-loose">{copy.listIntro}</p>
        <CourseGrid courses={getCourses(locale)} preloadFirst />
      </section>
    </>
  );
}
