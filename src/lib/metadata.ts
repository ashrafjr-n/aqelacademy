import type { Metadata } from "next";
import shareImage from "@/assets/images/share.jpg";
import { site } from "@/content/site";

/**
 * Link-preview defaults (WhatsApp, Facebook…). Next replaces `openGraph` as a whole, so a page
 * that sets its own title spreads these to keep the image and site name.
 */
export const baseOpenGraph = {
  type: "website",
  locale: "ar_AR",
  siteName: site.name,
  images: [{ url: shareImage.src, width: shareImage.width, height: shareImage.height, alt: site.fullName }],
} satisfies Metadata["openGraph"];
