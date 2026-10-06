import Image from "next/image";
import type { ContentImage } from "@/types/content";

const shapeClasses = {
  landscape: "aspect-[3/2]",
  portrait: "aspect-[9/10]",
};

interface FramedImageProps {
  image: ContentImage;
  sizes: string;
  shape?: keyof typeof shapeClasses;
  /** For the page's main image. */
  preload?: boolean;
}

/** A photo with a thin gold frame offset behind it, toward the bottom-left. */
export function FramedImage({ image, sizes, shape = "landscape", preload = false }: FramedImageProps) {
  return (
    <div className="relative pe-3 pb-3 sm:pe-4 sm:pb-4">
      <div aria-hidden="true" className="absolute top-3 start-3 end-0 bottom-0 rounded-lg border border-gold/70 sm:top-4 sm:start-4" />
      <div className={`relative overflow-hidden rounded-lg bg-surface ${shapeClasses[shape]}`}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </div>
    </div>
  );
}
