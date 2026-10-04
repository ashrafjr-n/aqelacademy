"use client";

import { LoaderCircle, type LucideIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { buttonClassName, type ButtonVariant } from "@/components/ui/button-styles";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
  variant?: ButtonVariant;
  icon?: LucideIcon;
  /** Forms stack their button full width; inline action rows don't. */
  fullWidth?: boolean;
}

export function SubmitButton({ label, pendingLabel, variant = "primary", icon: Icon, fullWidth = true }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`${buttonClassName(variant)} py-3.5 text-base ${fullWidth ? "w-full" : ""}`}
    >
      {pending ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> : Icon && <Icon aria-hidden="true" className="size-5" />}
      {pending ? pendingLabel : label}
    </button>
  );
}
