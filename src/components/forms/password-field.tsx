"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { describedByOf, FieldShell, fieldIconClassName, fieldIdOf, inputClassName } from "@/components/forms/field";
import { useLocale } from "@/components/locale-provider";
import { formsCopy } from "@/content/forms";
import { dirOf } from "@/lib/i18n";

// The input is dir="ltr" on every page, so the icon and toggle sides follow the page direction physically.
const sides = {
  rtl: { input: "pr-11 pl-12", toggle: "left-0 rounded-l-lg" },
  ltr: { input: "pl-11 pr-12", toggle: "right-0 rounded-r-lg" },
} as const;

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
  const locale = useLocale();
  const copy = formsCopy[locale];
  const side = sides[dirOf(locale)];

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
          className={`${inputClassName} ${side.input}`}
        />
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? copy.hidePassword : copy.showPassword}
          aria-pressed={isVisible}
          aria-controls={id}
          className={`absolute inset-y-0 flex items-center px-3.5 text-body/70 hover:text-brand focus-visible:outline-2 focus-visible:outline-brand ${side.toggle}`}
        >
          <ToggleIcon aria-hidden="true" className="size-5" />
        </button>
      </div>
    </FieldShell>
  );
}
