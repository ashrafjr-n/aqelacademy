import { ButtonLink } from "@/components/ui/button-link";
import { FramedImage } from "@/components/ui/framed-image";
import type { ContentImage, NavLink } from "@/types/content";

interface HomeHeroProps {
  eyebrow: string;
  title: string;
  text: string;
  image: ContentImage;
  /** First action is primary, the rest are outlined. */
  actions: NavLink[];
}

export function HomeHero({ eyebrow, title, text, image, actions }: HomeHeroProps) {
  return (
    <section className="border-b border-line">
      <div className="container-site grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-sm font-bold text-gold-dark">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {eyebrow}
          </p>
          <h1 className="mt-6 font-heading text-3xl font-bold leading-normal text-ink sm:text-4xl sm:leading-normal lg:text-[2.75rem] lg:leading-normal">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-loose">{text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <ButtonLink key={action.href} href={action.href} variant={index === 0 ? "primary" : "outline"}>
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </div>

        <FramedImage image={image} sizes="(min-width: 1024px) 34rem, 100vw" preload />
      </div>
    </section>
  );
}
