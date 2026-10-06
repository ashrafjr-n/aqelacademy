import { LoadingState } from "@/components/ui/loading-state";
import { getLocale } from "@/lib/locale";

export default async function Loading() {
  return <LoadingState locale={await getLocale()} />;
}
