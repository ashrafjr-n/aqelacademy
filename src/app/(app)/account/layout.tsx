import type { ReactNode } from "react";

/** The profile page and a booking's own page. Students have no dashboard: the header panels and course pages carry the rest. */
export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container-site py-8 sm:py-12">
      <div className="mx-auto max-w-3xl space-y-6">{children}</div>
    </div>
  );
}
