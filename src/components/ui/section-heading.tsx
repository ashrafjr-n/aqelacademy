import type { NavLink } from "@/types/content";
import { ButtonLink } from "@/components/ui/button-link";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: NavLink;
}

export function SectionHeading({ title, subtitle, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-ink md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-body">{subtitle}</p>}
      </div>
      {action && (
        <ButtonLink href={action.href} variant="outline">
          {action.label}
        </ButtonLink>
      )}
    </div>
  );
}
