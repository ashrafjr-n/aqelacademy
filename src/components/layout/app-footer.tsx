import Link from "next/link";
import { siteText } from "@/content/site";
import { defaultLocale, localePath, type Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

interface AppFooterProps {
  /** The dashboard is Arabic only, so it leaves this out. */
  locale?: Locale;
}

/** One-line footer for the account area, sign-in pages and the doctor's dashboard. */
export function AppFooter({ locale = defaultLocale }: AppFooterProps) {
  const year = new Date().getFullYear();
  const text = siteText[locale];

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-sm sm:flex-row">
        <p>
          © {year} {text.name}
        </p>
        <nav aria-label={text.chrome.helpLinks}>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <li>
              <Link href={localePath(locale, "/policy")} className="hover:text-brand">
                {text.chrome.privacyPolicy}
              </Link>
            </li>
            <li>
              <Link href={localePath(locale, "/contact-us")} className="hover:text-brand">
                {text.chrome.contactUs}
              </Link>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                {text.chrome.whatsapp}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
