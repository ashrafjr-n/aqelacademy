import { ArticleGrid } from "@/components/blog/article-grid";
import { CourseGrid } from "@/components/courses/course-grid";
import { AccreditationStrip } from "@/components/home/accreditation-strip";
import { HomeHero } from "@/components/home/home-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { CheckList } from "@/components/ui/check-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitSection } from "@/components/ui/split-section";
import { articles } from "@/content/articles";
import { courses } from "@/content/courses";
import {
  accreditations,
  featuredCoursesSection,
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
        title={homeHero.title}
        text={homeHero.text}
        image={homeHero.image}
        actions={[homeHero.primaryAction, homeHero.secondaryAction]}
      />

      <AccreditationStrip badges={accreditations} />

      <section className="container-site py-20">
        <SectionHeading
          title={featuredCoursesSection.title}
          subtitle={featuredCoursesSection.subtitle}
          action={featuredCoursesSection.action}
        />
        <CourseGrid courses={featuredCourses} />
      </section>

      <section className="bg-brand-soft py-20">
        <div className="container-site">
          <SplitSection image={journeySection.image}>
            <h2 className="text-2xl font-bold text-ink md:text-3xl">{journeySection.title}</h2>
            <p className="mt-4 text-lg leading-relaxed">{journeySection.text}</p>
            <div className="mt-6">
              <CheckList items={journeySection.points} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={journeySection.primaryAction.href}>{journeySection.primaryAction.label}</ButtonLink>
              <ButtonLink href={journeySection.secondaryAction.href} variant="outline">
                {journeySection.secondaryAction.label}
              </ButtonLink>
            </div>
          </SplitSection>
        </div>
      </section>

      <section className="container-site pt-20">
        <SectionHeading title={latestArticlesSection.title} action={latestArticlesSection.action} />
        <ArticleGrid articles={latestArticles} />
      </section>
    </>
  );
}
