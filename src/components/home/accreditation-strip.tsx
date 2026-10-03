import Image from "next/image";
import type { ContentImage } from "@/types/content";

interface AccreditationStripProps {
  badges: ContentImage[];
}

export function AccreditationStrip({ badges }: AccreditationStripProps) {
  return (
    <section aria-label="الاعتمادات" className="border-b border-line">
      <ul className="container-site flex flex-wrap items-center justify-center gap-10 py-10 md:gap-24">
        {badges.map((badge) => (
          <li key={badge.alt}>
            <Image src={badge.src} alt={badge.alt} sizes="240px" className="h-24 w-auto md:h-28" />
          </li>
        ))}
      </ul>
    </section>
  );
}
