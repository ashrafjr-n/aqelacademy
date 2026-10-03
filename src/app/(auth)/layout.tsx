import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="bg-surface py-16">
      <div className="container-site">
        <div className="mx-auto max-w-md rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">{children}</div>
      </div>
    </section>
  );
}
