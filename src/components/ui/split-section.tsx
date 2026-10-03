import Image from "next/image";
import type { ReactNode } from "react";
import type { ContentImage } from "@/types/content";

interface SplitSectionProps {
  image: ContentImage;
  /** Which side the image sits on in reading order. */
  imageSide?: "start" | "end";
  children: ReactNode;
}

export function SplitSection({ image, imageSide = "end", children }: SplitSectionProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={imageSide === "start" ? "lg:order-2" : undefined}>{children}</div>
      <div className="relative mx-auto aspect-[9/10] w-full max-w-md overflow-hidden rounded-3xl bg-surface">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover" />
      </div>
    </div>
  );
}
