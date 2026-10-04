import Image from "next/image";
import { cardClassName } from "@/components/ui/card";
import type { Instructor } from "@/types/content";

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div className={`${cardClassName} flex items-center gap-5 p-5`}>
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-surface ring-4 ring-brand-soft sm:size-24">
        <Image src={instructor.image.src} alt={instructor.image.alt} fill sizes="96px" className="object-cover object-top" />
      </div>
      <div>
        <p className="text-lg font-bold text-ink">{instructor.name}</p>
        <p className="mt-1 text-sm">{instructor.title}</p>
      </div>
    </div>
  );
}
