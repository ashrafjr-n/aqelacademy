import Image from "next/image";
import { site } from "@/content/site";

/** The opening screen: a white page, the logo in the middle and a thin progress bar that fills and then reveals the site. */
export function Splash() {
  return (
    <div aria-hidden="true" className="splash pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-white">
      <Image src={site.logo.src} alt="" preload sizes="160px" className="size-32 sm:size-40" />
      <div className="h-1 w-44 overflow-hidden rounded-full bg-line sm:w-56">
        <div className="splash-bar h-full rounded-full bg-gold" />
      </div>
    </div>
  );
}
