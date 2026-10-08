import { PolicySectionCards } from "@/components/ui/policy-section-cards";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PolicySection } from "@/types/content";

interface RefundPolicySectionProps {
  title: string;
  intro: string;
  sections: PolicySection[];
}

/** The refund policy on the home page: one card per clause. */
export function RefundPolicySection({ title, intro, sections }: RefundPolicySectionProps) {
  return (
    <section className="border-t border-line bg-canvas py-20">
      <div className="container-site">
        <SectionHeading title={title} subtitle={intro} />
        <PolicySectionCards sections={sections} className="text-sm md:grid-cols-2 lg:grid-cols-3" />
      </div>
    </section>
  );
}
