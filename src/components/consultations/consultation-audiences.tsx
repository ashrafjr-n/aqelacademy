import { HeartHandshake, type LucideIcon, UserRound } from "lucide-react";
import { cardClassName } from "@/components/ui/card";
import { CheckList } from "@/components/ui/check-list";
import type { ConsultationAudience, ConsultationAudienceId } from "@/content/consultations";

const audienceIcons: Record<ConsultationAudienceId, LucideIcon> = {
  adults: UserRound,
  children: HeartHandshake,
};

interface ConsultationAudiencesProps {
  audiences: ConsultationAudience[];
}

/** One card per audience (adults, children with their parents), on the home page and `/consultations`. */
export function ConsultationAudiences({ audiences }: ConsultationAudiencesProps) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {audiences.map(({ id, title, note, items }) => {
        const Icon = audienceIcons[id];
        return (
          <li key={id} className={`${cardClassName} border-t-2 border-t-gold p-6 sm:p-8`}>
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold-soft text-gold-dark">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h3 className="font-heading text-xl font-bold leading-snug text-ink">{title}</h3>
                {note && <p className="text-sm">{note}</p>}
              </div>
            </div>
            <div className="mt-6 text-lg">
              <CheckList items={items} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
