interface AuthHeadingProps {
  title: string;
  subtitle: string;
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{title}</h1>
      <p className="mt-2 leading-relaxed">{subtitle}</p>
    </div>
  );
}
