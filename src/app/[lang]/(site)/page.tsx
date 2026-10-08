import type { Metadata } from "next";
import { ArticleGrid } from "@/components/blog/article-grid";
import { CourseGrid } from "@/components/courses/course-grid";
import { CtaBand } from "@/components/home/cta-band";
import { HomeHero } from "@/components/home/home-hero";
import { RefundPolicySection } from "@/components/home/refund-policy-section";
import { ButtonLink } from "@/components/ui/button-link";
import { CheckList } from "@/components/ui/check-list";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitSection } from "@/components/ui/split-section";
import { getArticles } from "@/content/articles";
import { courseCopy, getCourses } from "@/content/courses";
import { homeContent } from "@/content/home";
import { refundPolicy } from "@/content/refund-policy";
import { localeLink } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: languageAlternates(await getLocale(), "/") };
}

export default async function HomePage() {
  const locale = await getLocale();
  const { hero, accreditationsTitle, accreditations, featuredCourses: featuredSection, latestArticles: articlesSection, journey, cta } = homeContent[locale];

  return (
    <>
      <HomeHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        text={hero.text}
        image={hero.image}
        actions={[localeLink(locale, hero.primaryAction), localeLink(locale, hero.secondaryAction)]}
        accreditationsTitle={accreditationsTitle}
        accreditations={accreditations}
      />

      <section className="container-site py-20">
        <Reveal>
          <SectionHeading title={featuredSection.title} subtitle={courseCopy[locale].listIntro} action={featuredSection.action} />
          <CourseGrid courses={getCourses(locale).slice(0, 3)} />
        </Reveal>
      </section>

      <section className="border-y border-line bg-canvas py-20">
        <Reveal className="container-site">
          <SplitSection image={journey.image}>
            <SectionHeading title={journey.title} />
            <p className="text-lg leading-loose">{journey.text}</p>
            <div className="mt-8 font-bold text-ink">
              <CheckList items={journey.points} />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={localeLink(locale, journey.primaryAction).href}>{journey.primaryAction.label}</ButtonLink>
              <ButtonLink href={localeLink(locale, journey.secondaryAction).href} variant="outline">
                {journey.secondaryAction.label}
              </ButtonLink>
            </div>
          </SplitSection>
        </Reveal>
      </section>

      <section className="container-site py-20">
        <Reveal>
          <SectionHeading title={articlesSection.title} action={articlesSection.action} />
          <ArticleGrid articles={getArticles(locale).slice(0, 3)} />
        </Reveal>
      </section>

      <Reveal>
        <CtaBand title={cta.title} text={cta.text} primaryAction={localeLink(locale, cta.primaryAction)} secondaryAction={localeLink(locale, cta.secondaryAction)} />
      </Reveal>

      <RefundPolicySection title={refundPolicy[locale].title} intro={refundPolicy[locale].intro} sections={refundPolicy[locale].sections} />
    </>
  );
}
