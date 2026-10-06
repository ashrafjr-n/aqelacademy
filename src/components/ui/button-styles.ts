export type ButtonVariant = "primary" | "outline" | "ghost" | "gold" | "light" | "whatsapp" | "success" | "danger";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

/** Each variant sets its own focus color, so the ring stays visible on navy backgrounds too. */
const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand",
  outline: "border border-ink/20 bg-white text-ink hover:border-ink/40 hover:bg-canvas focus-visible:outline-brand",
  ghost: "text-ink hover:bg-surface focus-visible:outline-brand",
  /** The main action on navy backgrounds. */
  gold: "bg-gold text-ink hover:brightness-105 focus-visible:outline-gold",
  /** A secondary action on navy backgrounds. */
  light: "border border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:outline-gold",
  whatsapp: "bg-whatsapp-dark text-white hover:brightness-110 focus-visible:outline-brand",
  success: "bg-success text-white hover:brightness-110 focus-visible:outline-brand",
  danger: "border border-danger/25 bg-danger-soft text-danger hover:bg-danger hover:text-white focus-visible:outline-brand",
};

/** Shared look for links and buttons that act as buttons. */
export function buttonClassName(variant: ButtonVariant = "primary"): string {
  return `${baseClasses} ${variantClasses[variant]}`;
}
