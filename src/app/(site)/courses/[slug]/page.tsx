import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseSummaryCard } from "@/components/courses/course-summary-card";
import { InstructorCard } from "@/components/courses/instructor-card";
import { PageHeader } from "@/components/ui/page-header";
import { RichText } from "@/components/ui/rich-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { courses, getCourse } from "@/content/courses";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return course ? { title: course.title, description: course.excerpt } : {};
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <>
      <PageHeader title={course.title} parents={[{ href: "/courses", label: "الدورات التدريبية" }]} />
      <div className="container-site grid gap-10 py-16 lg:grid-cols-[1fr_22rem]">
        <aside className="lg:sticky lg:top-28 lg:order-2 lg:self-start">
          <CourseSummaryCard course={course} />
        </aside>
        <div>
          <RichText blocks={course.body} />
          <div className="mt-12">
            <SectionHeading title="المدرب" />
            <InstructorCard instructor={course.instructor} />
          </div>
        </div>
      </div>
    </>
  );
}
