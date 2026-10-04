export type ButtonVariant = "primary" | "outline" | "ghost" | "light" | "whatsapp" | "success" | "danger";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand-dark",
  outline: "border border-line bg-white text-ink shadow-sm hover:border-ink/25 hover:bg-canvas",
  ghost: "text-ink hover:bg-surface",
  /** For dark (navy) backgrounds. */
  light: "bg-white text-ink shadow-sm hover:bg-brand-soft",
  whatsapp: "bg-whatsapp-dark text-white shadow-sm hover:brightness-110",
  success: "bg-success text-white shadow-sm hover:brightness-110",
  danger: "border border-danger/25 bg-danger-soft text-danger hover:bg-danger hover:text-white",
};

/** Shared look for links and buttons that act as buttons. */
export function buttonClassName(variant: ButtonVariant = "primary"): string {
  return `${baseClasses} ${variantClasses[variant]}`;
}
