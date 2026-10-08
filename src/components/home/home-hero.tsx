import Image from "next/image";
import { AccreditationBadges } from "@/components/home/accreditation-badges";
import { ButtonLink } from "@/components/ui/button-link";
import type { ContentImage, NavLink } from "@/types/content";

interface HomeHeroProps {
  /** The academy's English slogan, in both languages. */
  eyebrow: string;
  title: string;
  lead: string;
  text: string;
  image: ContentImage;
  /** First action is primary, the rest are outlined. */
  actions: NavLink[];
  accreditationsTitle: string;
  accreditations: ContentImage[];
}

interface HeroActionsProps {
  actions: NavLink[];
  className: string;
}

function HeroActions({ actions, className }: HeroActionsProps) {
  return (
    <div className={className}>
      {actions.map((action, index) => (
        <ButtonLink key={action.href} href={action.href} variant={index === 0 ? "primary" : "outline"}>
          {action.label}
        </ButtonLink>
      ))}
    </div>
  );
}

/**
 * On phones the photo runs edge to edge under the text, fading in from white, with the two actions sitting in
 * the fade and a thin gold arc across the top. From `sm` up it is a framed photo beside the text.
 */
export function HomeHero({ eyebrow, title, lead, text, image, actions, accreditationsTitle, accreditations }: HomeHeroProps) {
  return (
    <section className="overflow-hidden border-b border-line">
      <div className="container-site grid items-center gap-x-16 gap-y-12 py-14 max-sm:gap-y-0 max-sm:pt-8 max-sm:pb-10 md:py-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="flex flex-col items-center gap-3 text-center text-xs font-bold text-gold-dark ltr:tracking-wide sm:flex-row sm:text-start sm:text-sm">
            <span aria-hidden="true" className="order-2 h-px w-12 bg-gold sm:order-none sm:w-10" />
            {eyebrow}
          </p>
          <h1 className="mt-7 font-heading text-4xl font-bold max-sm:ltr:text-3xl leading-snug text-ink sm:mt-6 sm:leading-normal lg:text-[2.75rem] lg:leading-normal">{title}</h1>
          <p className="mt-5 max-w-xl text-lg font-bold leading-relaxed text-ink sm:mt-6 sm:text-xl">{lead}</p>
          <p className="mt-3 max-w-xl leading-loose sm:mt-4 sm:text-lg">{text}</p>
          <HeroActions actions={actions} className="mt-9 flex flex-wrap gap-3 max-sm:hidden" />
        </div>

        <div className="relative max-sm:-mx-4 max-sm:mt-2 max-sm:border-b max-sm:border-line sm:pe-4 sm:pb-4 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div aria-hidden="true" className="absolute top-4 start-4 end-0 bottom-0 rounded-lg border border-gold/70 max-sm:hidden" />
          <div className="relative aspect-[3/4] overflow-hidden bg-surface sm:aspect-[3/2] sm:rounded-lg">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 34rem, 100vw" preload className="object-cover object-[50%_75%] sm:object-center" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-white from-15% via-white/70 via-45% to-transparent sm:hidden" />
            <HeroActions actions={actions} className="absolute inset-x-4 top-5 flex gap-3 sm:hidden [&>a]:flex-1 [&>a]:justify-center [&>a]:px-3" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-1/4 top-[4.75rem] h-28 rounded-[50%] border-t border-gold/60 sm:hidden" />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <AccreditationBadges title={accreditationsTitle} badges={accreditations} />
        </div>
      </div>
    </section>
  );
}
