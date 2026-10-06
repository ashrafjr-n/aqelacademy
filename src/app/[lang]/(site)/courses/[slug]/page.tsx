import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseSummaryCard } from "@/components/courses/course-summary-card";
import { InstructorCard } from "@/components/courses/instructor-card";
import { PageHeader } from "@/components/ui/page-header";
import { RichText } from "@/components/ui/rich-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { courses, getCourse } from "@/content/courses";
import { baseOpenGraph } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return course ? { title: course.title, description: course.excerpt, openGraph: { ...baseOpenGraph, title: course.title, description: course.excerpt } } : {};
}

export default async function CoursePage({ params }: PageProps<"/[lang]/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <>
      <PageHeader title={course.title} parents={[{ href: "/courses", label: "الدورات التدريبية" }]} />
      <div className="container-site grid gap-12 py-20 lg:grid-cols-[1fr_22rem] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:order-2 lg:self-start">
          <CourseSummaryCard course={course} />
        </aside>
        <div>
          <RichText blocks={course.body} />
          <div className="mt-16">
            <SectionHeading title="المدرب" />
            <InstructorCard instructor={course.instructor} />
          </div>
        </div>
      </div>
    </>
  );
}
