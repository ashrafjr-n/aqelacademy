import { NotFoundView } from "@/components/layout/not-found-view";
import { getLocale } from "@/lib/locale";

export default async function NotFound() {
  return <NotFoundView locale={await getLocale()} />;
}
