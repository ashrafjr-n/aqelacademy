import type { ReactNode } from "react";
import { FramedImage } from "@/components/ui/framed-image";
import type { ContentImage } from "@/types/content";

interface SplitSectionProps {
  image: ContentImage;
  /** Which side the image sits on in reading order. */
  imageSide?: "start" | "end";
  children: ReactNode;
}

export function SplitSection({ image, imageSide = "end", children }: SplitSectionProps) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={imageSide === "start" ? "lg:order-2" : undefined}>{children}</div>
      <div className="mx-auto w-full max-w-md">
        <FramedImage image={image} shape="portrait" sizes="(min-width: 1024px) 28rem, 100vw" />
      </div>
    </div>
  );
}
