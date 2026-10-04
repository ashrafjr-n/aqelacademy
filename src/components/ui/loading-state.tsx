import { LoaderCircle } from "lucide-react";

export function LoadingState() {
  return (
    <div role="status" className="flex items-center justify-center gap-3 rounded-2xl border border-line bg-white p-10 font-bold text-ink shadow-card">
      <LoaderCircle aria-hidden="true" className="size-6 animate-spin text-brand" />
      جارٍ التحميل…
    </div>
  );
}
