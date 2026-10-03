interface AuthHeadingProps {
  title: string;
  subtitle: string;
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      <p className="mt-2 leading-relaxed">{subtitle}</p>
    </div>
  );
}
