"use client";

import { buttonClassName } from "@/components/ui/button-styles";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <section className="container-site py-32 text-center">
      <h1 className="text-2xl font-bold text-ink">حدث خطأ غير متوقع</h1>
      <p className="mt-3">نعتذر عن ذلك. حاول مرة أخرى بعد قليل.</p>
      <div className="mt-8">
        <button type="button" onClick={reset} className={buttonClassName("primary")}>
          إعادة المحاولة
        </button>
      </div>
    </section>
  );
}
