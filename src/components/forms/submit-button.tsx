"use client";

import { useFormStatus } from "react-dom";
import { buttonClassName } from "@/components/ui/button-styles";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
}

export function SubmitButton({ label, pendingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={`${buttonClassName("primary")} w-full`}>
      {pending ? pendingLabel : label}
    </button>
  );
}
