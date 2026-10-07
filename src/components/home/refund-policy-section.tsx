import { cardClassName } from "@/components/ui/card";
import { renderInline } from "@/components/ui/rich-text";
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ title: sectionTitle, text, items }) => (
            <article key={sectionTitle} className={`${cardClassName} border-t-2 border-t-gold p-6`}>
              <h3 className="font-bold leading-snug text-ink">{sectionTitle}</h3>
              {text && <p className="mt-3 text-sm leading-relaxed">{text}</p>}
              {items && (
                <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed marker:text-gold">
                  {items.map((item) => (
                    <li key={item} className="break-words">
                      {renderInline(item)}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
