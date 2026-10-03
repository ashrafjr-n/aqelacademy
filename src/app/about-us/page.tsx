import type { Metadata } from "next";
import { CheckList } from "@/components/ui/check-list";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitSection } from "@/components/ui/split-section";
import { aboutAcademy, aboutMission, aboutValues, aboutVision, aboutWhyUs } from "@/content/about";

export const metadata: Metadata = {
  title: "من نحن",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="من نحن" />

      <section className="container-site py-16">
        <SplitSection image={aboutVision.image}>
          <SectionHeading title={aboutVision.title} />
          <div className="space-y-4 text-lg leading-relaxed">
            {aboutVision.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </SplitSection>
      </section>

      <section className="bg-surface py-16">
        <div className="container-site">
          <SplitSection image={aboutAcademy.image} imageSide="start">
            <SectionHeading title={aboutAcademy.title} />
            <div className="space-y-4 text-lg leading-relaxed">
              {aboutAcademy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6">
              <CheckList items={aboutAcademy.programs} />
            </div>
          </SplitSection>
        </div>
      </section>

      <section className="container-site grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading title={aboutWhyUs.title} />
          <CheckList items={aboutWhyUs.points} />
        </div>
        <div>
          <SectionHeading title={aboutMission.title} />
          <div className="space-y-4 text-lg leading-relaxed">
            {aboutMission.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site">
        <SectionHeading title={aboutValues.title} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
