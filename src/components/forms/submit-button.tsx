"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { buttonClassName, type ButtonVariant } from "@/components/ui/button-styles";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
  variant?: ButtonVariant;
}

export function SubmitButton({ label, pendingLabel, variant = "primary" }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={`${buttonClassName(variant)} w-full py-3.5 text-base`}>
      {pending && <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />}
      {pending ? pendingLabel : label}
    </button>
  );
}
