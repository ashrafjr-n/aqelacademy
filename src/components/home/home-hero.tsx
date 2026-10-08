import { AccreditationBadges } from "@/components/home/accreditation-badges";
import { ButtonLink } from "@/components/ui/button-link";
import { FramedImage } from "@/components/ui/framed-image";
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

export function HomeHero({ eyebrow, title, lead, text, image, actions, accreditationsTitle, accreditations }: HomeHeroProps) {
  return (
    <section className="border-b border-line">
      <div className="container-site grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p lang="en" className="flex items-center gap-3 text-sm font-bold text-gold-dark">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {eyebrow}
          </p>
          <h1 aria-label={title} className="mt-6 font-heading text-5xl font-bold leading-tight max-[379px]:ltr:text-4xl text-ink sm:text-4xl sm:leading-normal lg:text-[2.75rem] lg:leading-normal">
            {title.split(" ").map((word, index) => (
              <span key={index} aria-hidden="true" className="block sm:inline">
                {index > 0 && <span className="max-sm:hidden"> </span>}
                {word}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-xl font-bold leading-relaxed text-ink">{lead}</p>
          <p className="mt-4 max-w-xl text-lg leading-loose">{text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <ButtonLink key={action.href} href={action.href} variant={index === 0 ? "primary" : "outline"}>
                {action.label}
              </ButtonLink>
            ))}
          </div>
          <AccreditationBadges title={accreditationsTitle} badges={accreditations} />
        </div>

        <FramedImage image={image} sizes="(min-width: 1024px) 34rem, 100vw" preload />
      </div>
    </section>
  );
}
