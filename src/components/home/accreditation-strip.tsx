import Image from "next/image";
import type { ContentImage } from "@/types/content";

interface AccreditationStripProps {
  title: string;
  badges: ContentImage[];
}

export function AccreditationStrip({ title, badges }: AccreditationStripProps) {
  return (
    <section aria-label={title} className="border-y border-line bg-white">
      <div className="container-site flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-center sm:gap-12">
        <p className="text-sm font-bold text-body">{title}</p>
        <ul className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {badges.map((badge) => (
            <li key={badge.alt}>
              <Image src={badge.src} alt={badge.alt} sizes="200px" className="h-16 w-auto md:h-20" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
