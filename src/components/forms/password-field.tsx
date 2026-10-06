"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { describedByOf, FieldShell, fieldIconClassName, fieldIdOf, inputClassName } from "@/components/forms/field";

interface PasswordFieldProps {
  name: string;
  label: string;
  autoComplete: "current-password" | "new-password";
  error?: string;
  hint?: string;
}

export function PasswordField({ name, label, autoComplete, error, hint }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const id = fieldIdOf(name);
  const ToggleIcon = isVisible ? EyeOff : Eye;

  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <div className="relative">
        <span className={fieldIconClassName}>
          <LockKeyhole aria-hidden="true" className="size-5" />
        </span>
        <input
          id={id}
          name={name}
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete}
          required
          dir="ltr"
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedByOf(id, error, hint)}
          className={`${inputClassName} pl-12 pr-11`}
        />
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          aria-pressed={isVisible}
          aria-controls={id}
          className="absolute inset-y-0 left-0 flex items-center rounded-l-lg px-3.5 text-body/70 hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
          <ToggleIcon aria-hidden="true" className="size-5" />
        </button>
      </div>
    </FieldShell>
  );
}
