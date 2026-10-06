interface AuthHeadingProps {
  title: string;
  subtitle: string;
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div className="mb-8">
      <h1 className="font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl sm:leading-snug">{title}</h1>
      <p className="mt-2 leading-relaxed">{subtitle}</p>
    </div>
  );
}
