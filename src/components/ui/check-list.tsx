import { CircleCheck } from "lucide-react";

interface CheckListProps {
  items: string[];
}

export function CheckList({ items }: CheckListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
