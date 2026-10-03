import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import type { ContentImage, NavLink } from "@/types/content";

interface HomeHeroProps {
  title: string;
  text: string;
  image: ContentImage;
  /** First action is primary, the rest are outlined. */
  actions: NavLink[];
}

export function HomeHero({ title, text, image, actions }: HomeHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" preload className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-l from-white via-white/85 to-white/40" />
      <div className="container-site py-24 md:py-36">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold leading-tight text-ink md:text-5xl">{title}</h1>
          <p className="mt-6 text-lg leading-relaxed">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <ButtonLink key={action.href} href={action.href} variant={index === 0 ? "primary" : "outline"}>
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
