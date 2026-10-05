"use client";

import { TriangleAlert } from "lucide-react";
import { buttonClassName } from "@/components/ui/button-styles";

interface ErrorStateProps {
  /** Re-fetches and re-renders the failed segment (Next 16; `reset` would only re-render). */
  retry: () => void;
}

/** What every error boundary shows; each group has its own boundary so the page chrome stays. */
export function ErrorState({ retry }: ErrorStateProps) {
  return (
    <section className="container-site py-24 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-danger-soft text-danger">
        <TriangleAlert aria-hidden="true" className="size-7" />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-ink">حدث خطأ غير متوقع</h1>
      <p className="mt-3">نعتذر عن ذلك. حاول مرة أخرى بعد قليل.</p>
      <div className="mt-8">
        <button type="button" onClick={retry} className={buttonClassName("primary")}>
          إعادة المحاولة
        </button>
      </div>
    </section>
  );
}
