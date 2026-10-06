import { Fragment, type ReactNode } from "react";
import type { RichBlock } from "@/types/content";

interface RichTextProps {
  blocks: RichBlock[];
}

/** Splits `**bold**` markers into <strong> segments. */
function renderInline(text: string): ReactNode[] {
  return text
    .split("**")
    .map((part, index) => (index % 2 === 1 ? <strong key={index} className="font-bold text-ink">{part}</strong> : part));
}

function renderBlock(block: RichBlock): ReactNode {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="mt-12 font-heading text-2xl font-bold leading-snug text-ink">{block.text}</h2>
      ) : (
        <h3 className="mt-8 font-heading text-xl font-bold leading-snug text-ink">{block.text}</h3>
      );
    case "paragraph":
      return <p className="mt-4">{renderInline(block.text)}</p>;
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className={`mt-4 space-y-2 ps-6 ${block.ordered ? "list-decimal" : "list-disc"} marker:text-gold`}>
          {block.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ListTag>
      );
    }
  }
}

export function RichText({ blocks }: RichTextProps) {
  return (
    <div className="text-lg leading-loose [&>*:first-child]:mt-0">
      {blocks.map((block, index) => (
        // Static content: blocks never reorder, so the position is a stable key.
        <Fragment key={index}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  );
}
