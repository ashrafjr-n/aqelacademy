import type { Metadata } from "next";
import { Cairo, Noto_Naskh_Arabic } from "next/font/google";
import { site } from "@/content/site";
import { baseOpenGraph } from "@/lib/metadata";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.fullName,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: { ...baseOpenGraph, title: site.fullName, description: site.description },
  twitter: { card: "summary_large_image" },
};

/** Page chrome (header, footer) lives in the group layouts: (site), (app) and admin each have their own. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${naskh.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
