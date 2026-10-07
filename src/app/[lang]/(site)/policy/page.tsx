import type { Metadata } from "next";
import { PolicyArticle } from "@/components/ui/policy-article";
import { policyContent } from "@/content/policy";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: policyContent[locale].title, alternates: languageAlternates(locale, "/policy") };
}

export default async function PolicyPage() {
  return <PolicyArticle policy={policyContent[await getLocale()]} />;
}
