import Link from "next/link";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

/** One-line footer for the account area, sign-in pages and the doctor's dashboard. */
export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-sm sm:flex-row">
        <p>
          © {year} {site.name}
        </p>
        <nav aria-label="روابط مساعدة">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <li>
              <Link href="/policy" className="hover:text-brand">
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-brand">
                اتصل بنا
              </Link>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                واتساب
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
