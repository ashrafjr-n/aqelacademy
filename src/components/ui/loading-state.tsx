import { LoaderCircle } from "lucide-react";
import { siteText } from "@/content/site";
import { defaultLocale, type Locale } from "@/lib/i18n";

interface LoadingStateProps {
  /** The dashboard is Arabic only, so it leaves this out. */
  locale?: Locale;
}

export function LoadingState({ locale = defaultLocale }: LoadingStateProps) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 rounded-xl border border-line bg-white p-10 font-bold text-ink shadow-card">
      <LoaderCircle aria-hidden="true" className="size-6 animate-spin text-brand" />
      {siteText[locale].chrome.loading}
    </div>
  );
}
