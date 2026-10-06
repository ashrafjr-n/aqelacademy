import { Cairo, Noto_Naskh_Arabic } from "next/font/google";

/** UI text. */
export const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

/** Display headings on public pages (`font-heading`). */
export const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic", "latin"],
});

/** Classes for <html>: both font variables, shared by the site and dashboard root layouts. */
export const fontClassName = `${cairo.variable} ${naskh.variable}`;
