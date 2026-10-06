import { CircleCheck } from "lucide-react";
import { ArticleGrid } from "@/components/blog/article-grid";
import { CourseGrid } from "@/components/courses/course-grid";
import { AccreditationStrip } from "@/components/home/accreditation-strip";
import { CtaBand } from "@/components/home/cta-band";
import { HomeHero } from "@/components/home/home-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitSection } from "@/components/ui/split-section";
import { articles } from "@/content/articles";
import { courses } from "@/content/courses";
import {
  accreditations,
  accreditationsTitle,
  featuredCoursesSection,
  homeCta,
  homeHero,
  journeySection,
  latestArticlesSection,
} from "@/content/home";

const featuredCourses = courses.slice(0, 3);
const latestArticles = articles.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <HomeHero
        eyebrow={homeHero.eyebrow}
        title={homeHero.title}
        text={homeHero.text}
        image={homeHero.image}
        actions={[homeHero.primaryAction, homeHero.secondaryAction]}
      />

      <AccreditationStrip title={accreditationsTitle} badges={accreditations} />

      <section className="container-site py-20">
        <SectionHeading
          title={featuredCoursesSection.title}
          subtitle={featuredCoursesSection.subtitle}
          action={featuredCoursesSection.action}
        />
        <CourseGrid courses={featuredCourses} />
      </section>

      <section className="bg-canvas py-20">
        <div className="container-site">
          <SplitSection image={journeySection.image}>
            <SectionHeading title={journeySection.title} />
            <p className="text-lg leading-relaxed">{journeySection.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {journeySection.points.map((point) => (
                <li key={point} className="flex items-center gap-3 rounded-xl bg-white p-4 font-bold text-ink shadow-card">
                  <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-success" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={journeySection.primaryAction.href}>{journeySection.primaryAction.label}</ButtonLink>
              <ButtonLink href={journeySection.secondaryAction.href} variant="outline">
                {journeySection.secondaryAction.label}
              </ButtonLink>
            </div>
          </SplitSection>
        </div>
      </section>

      <section className="container-site py-20">
        <SectionHeading title={latestArticlesSection.title} action={latestArticlesSection.action} />
        <ArticleGrid articles={latestArticles} />
      </section>

      <CtaBand {...homeCta} />
    </>
  );
}
