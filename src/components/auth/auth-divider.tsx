interface AuthDividerProps {
  label: string;
}

export function AuthDivider({ label }: AuthDividerProps) {
  return (
    <div className="my-6 flex items-center gap-4 text-sm">
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      {label}
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}
