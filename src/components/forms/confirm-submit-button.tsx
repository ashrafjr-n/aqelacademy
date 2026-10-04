"use client";

import { type ReactNode, useState } from "react";
import { useFormStatus } from "react-dom";
import { buttonClassName, type ButtonVariant } from "@/components/ui/button-styles";

interface ConfirmSubmitButtonProps {
  label: string;
  question: string;
  /** A rendered icon element; Server Components can't pass the icon component itself. */
  icon: ReactNode;
  variant?: ButtonVariant;
}

/** Submit button that asks "are you sure?" first, for decisions that change what a student sees. */
export function ConfirmSubmitButton({ label, question, icon, variant = "danger" }: ConfirmSubmitButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const { pending } = useFormStatus();

  if (!isConfirming) {
    return (
      <button type="button" onClick={() => setIsConfirming(true)} className={`${buttonClassName(variant)} py-3.5 text-base`}>
        {icon}
        {label}
      </button>
    );
  }

  return (
    <div role="group" aria-label={question} className="flex flex-wrap items-center gap-2 rounded-full bg-surface p-1.5 ps-4">
      <span className="font-bold text-ink">{question}</span>
      <button type="submit" disabled={pending} className={`${buttonClassName(variant)} py-3 text-base`}>
        نعم، {label}
      </button>
      <button type="button" disabled={pending} onClick={() => setIsConfirming(false)} className={`${buttonClassName("outline")} py-3 text-base`}>
        تراجع
      </button>
    </div>
  );
}
