import type { Metadata } from "next";
import { CheckList } from "@/components/ui/check-list";
import { PageHeader } from "@/components/ui/page-header";
import { SplitSection } from "@/components/ui/split-section";
import { aboutAcademy, aboutMission, aboutValues, aboutVision, aboutWhyUs } from "@/content/about";

export const metadata: Metadata = {
  title: "من نحن",
};

const sectionTitle = "text-2xl font-bold text-ink md:text-3xl";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="من نحن" />

      <section className="container-site py-16">
        <SplitSection image={aboutVision.image}>
          <h2 className={sectionTitle}>{aboutVision.title}</h2>
          {aboutVision.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </SplitSection>
      </section>

      <section className="bg-surface py-16">
        <div className="container-site">
          <SplitSection image={aboutAcademy.image} imageSide="start">
            <h2 className={sectionTitle}>{aboutAcademy.title}</h2>
            {aboutAcademy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
            <div className="mt-6">
              <CheckList items={aboutAcademy.programs} />
            </div>
          </SplitSection>
        </div>
      </section>

      <section className="container-site grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className={sectionTitle}>{aboutWhyUs.title}</h2>
          <div className="mt-6">
            <CheckList items={aboutWhyUs.points} />
          </div>
        </div>
        <div>
          <h2 className={sectionTitle}>{aboutMission.title}</h2>
          {aboutMission.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="container-site">
        <h2 className={sectionTitle}>{aboutValues.title}</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutValues.items.map((value) => (
            <li key={value.title} className="rounded-2xl border border-line p-6">
              <h3 className="text-lg font-bold text-brand">{value.title}</h3>
              <p className="mt-2 leading-relaxed">{value.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
