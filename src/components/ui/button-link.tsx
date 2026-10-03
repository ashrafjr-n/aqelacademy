import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClassName, type ButtonVariant } from "@/components/ui/button-styles";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Opens in a new tab (WhatsApp, mailto, other sites). */
  external?: boolean;
}

export function ButtonLink({ href, children, variant = "primary", external = false }: ButtonLinkProps) {
  const className = buttonClassName(variant);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
