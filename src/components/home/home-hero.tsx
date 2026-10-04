import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import type { ContentImage, NavLink } from "@/types/content";

interface HomeHeroProps {
  eyebrow: string;
  title: string;
  text: string;
  image: ContentImage;
  /** Accreditation badge floating over the image. */
  badge: ContentImage;
  /** First action is primary, the rest are outlined. */
  actions: NavLink[];
}

export function HomeHero({ eyebrow, title, text, image, badge, actions }: HomeHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-canvas">
      <div aria-hidden="true" className="absolute -top-40 -end-40 -z-10 size-[32rem] rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-48 -start-32 -z-10 size-[28rem] rounded-full bg-ink/5 blur-3xl" />
      <div className="container-site grid items-center gap-14 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1.5 text-sm font-bold text-brand-dark shadow-sm">
            <BadgeCheck aria-hidden="true" className="size-4" />
            {eyebrow}
          </p>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.2]">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <ButtonLink key={action.href} href={action.href} variant={index === 0 ? "primary" : "outline"}>
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className="relative pb-8 lg:pb-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-lift">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 34rem, 100vw" preload className="object-cover" />
          </div>
          <div className="absolute bottom-0 start-4 rounded-2xl bg-white p-3 shadow-pop lg:-bottom-6 lg:-start-6">
            <Image src={badge.src} alt={badge.alt} sizes="160px" className="h-12 w-auto sm:h-14" />
          </div>
        </div>
      </div>
    </section>
  );
}
