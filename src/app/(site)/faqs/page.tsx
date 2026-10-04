import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { cardClassName } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "أسئلة شائعة",
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader title="أسئلة شائعة" />
      <section className="container-site pt-16 pb-20">
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className={`${cardClassName} group open:shadow-lift`}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface transition-colors group-open:bg-brand-soft">
                  <ChevronDown aria-hidden="true" className="size-5 text-brand transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <p className="px-5 pb-5 leading-loose">
                {faq.answer}
                {faq.link && (
                  <>
                    {" "}
                    <Link href={faq.link.href} className="font-bold text-brand hover:text-brand-dark">
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
