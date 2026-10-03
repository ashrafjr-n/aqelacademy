import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "أكاديمية الدكتور موفق عقل",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
