import type { Metadata } from "next";
import { PolicyArticle } from "@/components/ui/policy-article";
import { refundPolicyContent } from "@/content/refund-policy";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: refundPolicyContent[locale].title, alternates: languageAlternates(locale, "/refund-policy") };
}

export default async function RefundPolicyPage() {
  return <PolicyArticle policy={refundPolicyContent[await getLocale()]} />;
}
