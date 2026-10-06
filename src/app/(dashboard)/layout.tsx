import type { Metadata } from "next";
import { fontClassName } from "@/app/fonts";
import { LocaleProvider } from "@/components/locale-provider";
import { site } from "@/content/site";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  robots: { index: false, follow: false },
};

/** Root layout of the doctor's dashboard, which stays Arabic only. Its chrome lives in admin/layout.tsx. */
export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${fontClassName} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <LocaleProvider locale="ar">{children}</LocaleProvider>
      </body>
    </html>
  );
}
