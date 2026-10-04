import { LoaderCircle } from "lucide-react";

export function LoadingState() {
  return (
    <div role="status" className="flex items-center justify-center gap-3 rounded-3xl border border-line bg-white p-10 font-bold text-ink">
      <LoaderCircle aria-hidden="true" className="size-6 animate-spin text-brand" />
      جارٍ التحميل…
    </div>
  );
}
