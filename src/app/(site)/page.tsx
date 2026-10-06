import { ArticleGrid } from "@/components/blog/article-grid";
import { CourseGrid } from "@/components/courses/course-grid";
import { AccreditationStrip } from "@/components/home/accreditation-strip";
import { CtaBand } from "@/components/home/cta-band";
import { HomeHero } from "@/components/home/home-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { CheckList } from "@/components/ui/check-list";
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

      <section className="border-y border-line bg-canvas py-20">
        <div className="container-site">
          <SplitSection image={journeySection.image}>
            <SectionHeading title={journeySection.title} />
            <p className="text-lg leading-loose">{journeySection.text}</p>
            <div className="mt-8 font-bold text-ink">
              <CheckList items={journeySection.points} />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
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
