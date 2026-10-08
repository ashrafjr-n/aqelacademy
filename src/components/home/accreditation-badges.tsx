import Image from "next/image";
import type { ContentImage } from "@/types/content";

interface AccreditationBadgesProps {
  title: string;
  badges: ContentImage[];
}

/** "Approved by" and the accreditation logos, inside the hero under the actions. */
export function AccreditationBadges({ title, badges }: AccreditationBadgesProps) {
  return (
    <section aria-label={title} className="mt-10 border-t border-line pt-6">
      <p className="flex items-center gap-3 text-sm font-bold text-gold-dark">
        <span aria-hidden="true" className="h-px w-8 bg-gold" />
        {title}
      </p>
      <ul className="mt-4 flex flex-wrap items-stretch gap-3 sm:gap-4">
        {badges.map((badge) => (
          <li key={badge.alt} className="flex items-center rounded-lg border border-line bg-white px-4 py-3 shadow-card">
            <Image src={badge.src} alt={badge.alt} sizes="200px" className="h-14 w-auto sm:h-16" />
          </li>
        ))}
      </ul>
    </section>
  );
}
