import { ButtonLink } from "@/components/ui/button-link";
import type { NavLink } from "@/types/content";

interface CtaBandProps {
  title: string;
  text: string;
  primaryAction: NavLink;
  secondaryAction: NavLink;
}

/** The closing call to action: a navy panel with a thin gold inner frame. */
export function CtaBand({ title, text, primaryAction, secondaryAction }: CtaBandProps) {
  return (
    <section className="container-site pb-20">
      <div className="relative rounded-xl bg-ink px-6 py-14 text-center sm:px-12 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-lg border border-gold/40 sm:inset-3" />
        <span aria-hidden="true" className="mx-auto block h-0.5 w-12 bg-gold" />
        <h2 className="mt-6 font-heading text-2xl font-bold leading-snug text-white md:text-3xl md:leading-snug">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl leading-loose text-white/80">{text}</p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryAction.href} variant="gold">
            {primaryAction.label}
          </ButtonLink>
          <ButtonLink href={secondaryAction.href} variant="light">
            {secondaryAction.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
