export type ButtonVariant = "primary" | "outline" | "whatsapp";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  outline: "border border-ink/20 bg-white text-ink hover:border-brand hover:text-brand",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
};

/** Shared look for links and buttons that act as buttons. */
export function buttonClassName(variant: ButtonVariant = "primary"): string {
  return `${baseClasses} ${variantClasses[variant]}`;
}
