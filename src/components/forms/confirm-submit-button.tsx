"use client";

import { type ReactNode, useState } from "react";
import { useFormStatus } from "react-dom";
import { useLocale } from "@/components/locale-provider";
import { buttonClassName, type ButtonVariant } from "@/components/ui/button-styles";
import { formsCopy } from "@/content/forms";

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
  const copy = formsCopy[useLocale()];

  if (!isConfirming) {
    return (
      <button type="button" onClick={() => setIsConfirming(true)} className={`${buttonClassName(variant)} py-3.5 text-base`}>
        {icon}
        {label}
      </button>
    );
  }

  return (
    <div role="group" aria-label={question} className="flex flex-wrap items-center gap-2 rounded-xl bg-surface p-1.5 ps-4">
      <span className="font-bold text-ink">{question}</span>
      <button type="submit" disabled={pending} className={`${buttonClassName(variant)} py-3 text-base`}>
        {copy.confirmYes(label)}
      </button>
      <button type="button" disabled={pending} onClick={() => setIsConfirming(false)} className={`${buttonClassName("outline")} py-3 text-base`}>
        {copy.confirmCancel}
      </button>
    </div>
  );
}
