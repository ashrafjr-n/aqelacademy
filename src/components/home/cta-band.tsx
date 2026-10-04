import { ButtonLink } from "@/components/ui/button-link";
import type { NavLink } from "@/types/content";

interface CtaBandProps {
  title: string;
  text: string;
  primaryAction: NavLink;
  secondaryAction: NavLink;
}

/** The closing call to action: a navy panel with two buttons. */
export function CtaBand({ title, text, primaryAction, secondaryAction }: CtaBandProps) {
  return (
    <section className="container-site pb-20">
      <div className="relative isolate overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center sm:px-12">
        <div aria-hidden="true" className="absolute -top-24 -start-16 -z-10 size-72 rounded-full bg-brand/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -end-10 -z-10 size-80 rounded-full bg-white/10 blur-3xl" />
        <h2 className="text-2xl font-extrabold text-white md:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/80">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryAction.href}>{primaryAction.label}</ButtonLink>
          <ButtonLink href={secondaryAction.href} variant="light">
            {secondaryAction.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
