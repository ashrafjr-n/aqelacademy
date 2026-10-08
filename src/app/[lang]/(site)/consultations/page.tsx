import type { Metadata } from "next";
import { ConsultationAudiences } from "@/components/consultations/consultation-audiences";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClassName } from "@/components/ui/card";
import { CheckList } from "@/components/ui/check-list";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { consultationsContent } from "@/content/consultations";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";
import { whatsappUrl } from "@/lib/whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { title, intro } = consultationsContent[locale];
  return { title, description: intro, alternates: languageAlternates(locale, "/consultations") };
}

export default async function ConsultationsPage() {
  const { title, heading, intro, offerTitle, audiences, featuresTitle, features, cta } = consultationsContent[await getLocale()];
  const bookingUrl = whatsappUrl(cta.whatsappPrefill);

  return (
    <>
      <PageHeader title={title} />

      <section className="container-site py-20">
        <div className="max-w-3xl">
          <SectionHeading title={heading} />
          <p className="text-lg leading-loose">{intro}</p>
          <div className="mt-8">
            <ButtonLink href={bookingUrl} variant="whatsapp" external>
              <WhatsAppIcon aria-hidden="true" className="size-5" />
              {cta.button}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-canvas py-20">
        <div className="container-site">
          <SectionHeading title={offerTitle} />
          <ConsultationAudiences audiences={audiences} />
        </div>
      </section>

      <section className="container-site grid gap-12 py-20 lg:grid-cols-2 lg:gap-16">
        <div className={`${cardClassName} border-t-2 border-t-gold p-6 sm:p-8`}>
          <SectionHeading title={featuresTitle} />
          <div className="font-bold text-ink">
            <CheckList items={features} />
          </div>
        </div>
        <div>
          <SectionHeading title={cta.title} />
          <p className="text-lg leading-loose">{cta.text}</p>
          <div className="mt-8">
            <ButtonLink href={bookingUrl} variant="whatsapp" external>
              <WhatsAppIcon aria-hidden="true" className="size-5" />
              {cta.button}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
