import Image from "next/image";
import { site } from "@/content/site";

/** Runs before the first paint: a tab that already saw the opening screen skips it, however it navigates (full page loads, language switch, the dashboard). */
const skipIfSeen = `try{if(sessionStorage.getItem("splash")){document.documentElement.dataset.splash="seen"}else{sessionStorage.setItem("splash","1")}}catch(e){}`;

/** The opening screen: a white page, the logo in the middle and a thin progress bar that fills and then reveals the site. Shown once per browser tab session. */
export function Splash() {
  return (
    <>
      <div aria-hidden="true" className="splash pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-white">
        <Image src={site.logo.src} alt="" preload sizes="160px" className="size-32 sm:size-40" />
        <div className="h-1 w-44 overflow-hidden rounded-full bg-line sm:w-56">
          <div className="splash-bar h-full rounded-full bg-gold" />
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: skipIfSeen }} />
    </>
  );
}
