const sizeClasses = {
  sm: "size-8 text-sm",
  md: "size-10 text-base",
  lg: "size-12 text-lg",
};

interface AvatarProps {
  name: string;
  size?: keyof typeof sizeClasses;
}

/** A person's first initial in a circle (no photos are stored). */
export function Avatar({ name, size = "md" }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "؟";

  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full bg-brand-soft font-bold text-brand-dark ${sizeClasses[size]}`}>
      {initial}
    </span>
  );
}
