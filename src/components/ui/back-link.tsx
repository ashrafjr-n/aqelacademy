import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BackLinkProps {
  href: string;
  label: string;
}

/** "Back to …" link; the chevron points right because the page reads right-to-left. */
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 font-bold text-brand hover:text-brand-dark">
      <ChevronRight aria-hidden="true" className="size-5" />
      {label}
    </Link>
  );
}
