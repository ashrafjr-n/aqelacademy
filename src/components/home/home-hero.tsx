import { AccreditationBadges } from "@/components/home/accreditation-badges";
import { ButtonLink } from "@/components/ui/button-link";
import { FramedImage } from "@/components/ui/framed-image";
import type { ContentImage, NavLink } from "@/types/content";

interface HomeHeroProps {
  /** The academy's English slogan, in both languages. */
  eyebrow: string;
  title: string;
  /** `title` split into lines for phones. */
  titleLines: string[];
  /** The line set large on phones (the academy's own name). */
  emphasisLine: number;
  lead: string;
  text: string;
  image: ContentImage;
  /** First action is primary, the rest are outlined. */
  actions: NavLink[];
  accreditationsTitle: string;
  accreditations: ContentImage[];
}

export function HomeHero({ eyebrow, title, titleLines, emphasisLine, lead, text, image, actions, accreditationsTitle, accreditations }: HomeHeroProps) {
  return (
    <section className="border-b border-line">
      <div className="container-site grid items-center gap-x-16 gap-y-10 sm:gap-y-12 py-10 sm:py-14 md:py-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p lang="en" className="flex items-center gap-3 text-xs font-bold tracking-wide text-gold-dark sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold sm:w-10" />
            {eyebrow}
          </p>
          <h1 aria-label={title} className="mt-5 font-heading font-bold text-ink sm:mt-6 sm:text-4xl sm:leading-normal lg:text-[2.75rem] lg:leading-normal">
            {titleLines.map((line, index) => (
              <span
                key={line}
                aria-hidden="true"
                className={`block sm:inline ${index === emphasisLine ? "max-sm:py-1 max-sm:text-5xl max-sm:leading-tight max-[379px]:ltr:text-4xl" : "max-sm:text-xl max-sm:leading-relaxed max-sm:text-brand/80"}`}
              >
                {index > 0 && <span className="max-sm:hidden"> </span>}
                {line}
              </span>
            ))}
          </h1>
          <span aria-hidden="true" className="mt-5 block h-0.5 w-12 bg-gold sm:hidden" />
          <p className="mt-5 max-w-xl text-lg font-bold leading-relaxed text-ink sm:mt-6 sm:text-xl">{lead}</p>
          <p className="mt-3 max-w-xl leading-loose sm:mt-4 sm:text-lg">{text}</p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            {actions.map((action, index) => (
              <ButtonLink key={action.href} href={action.href} variant={index === 0 ? "primary" : "outline"}>
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <FramedImage image={image} sizes="(min-width: 1024px) 34rem, 100vw" preload />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <AccreditationBadges title={accreditationsTitle} badges={accreditations} />
        </div>
      </div>
    </section>
  );
}
