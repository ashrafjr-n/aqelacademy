import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "whatsapp";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Opens in a new tab (WhatsApp, mailto, other sites). */
  external?: boolean;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  outline: "border border-ink/20 bg-white text-ink hover:border-brand hover:text-brand",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
};

export function ButtonLink({ href, children, variant = "primary", external = false }: ButtonLinkProps) {
  const className = `${baseClasses} ${variantClasses[variant]}`;

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
