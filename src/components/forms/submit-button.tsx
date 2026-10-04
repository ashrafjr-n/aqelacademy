"use client";

import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { buttonClassName, type ButtonVariant } from "@/components/ui/button-styles";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
  variant?: ButtonVariant;
  /** A rendered icon element; Server Components can't pass the icon component itself. */
  icon?: ReactNode;
  /** Forms stack their button full width; inline action rows don't. */
  fullWidth?: boolean;
}

export function SubmitButton({ label, pendingLabel, variant = "primary", icon, fullWidth = true }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`${buttonClassName(variant)} py-3 text-base ${fullWidth ? "w-full" : ""}`}
    >
      {pending ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> : icon}
      {pending ? pendingLabel : label}
    </button>
  );
}
