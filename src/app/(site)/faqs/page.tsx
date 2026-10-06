import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "أسئلة شائعة",
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader title="أسئلة شائعة" />
      <section className="container-site py-20">
        <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.id} className="group">
              <summary className="flex list-none items-center justify-between gap-6 py-6 text-lg font-bold text-ink transition-colors hover:text-gold-dark [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-gold transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-6 leading-loose">
                {faq.answer}
                {faq.link && (
                  <>
                    {" "}
                    <Link href={faq.link.href} className="font-bold text-ink underline decoration-gold underline-offset-4 hover:text-gold-dark">
                      {faq.link.label}
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
