import { Check, X } from "lucide-react";
import { bookingSteps, type BookingStatus } from "@/content/bookings";

type StepState = "done" | "current" | "failed" | "upcoming";

const stepStates: Record<BookingStatus, StepState[]> = {
  pending: ["done", "current", "upcoming"],
  approved: ["done", "done", "current"],
  rejected: ["done", "failed", "upcoming"],
};

const stateLabels: Record<StepState, string> = {
  done: "مكتملة",
  current: "الخطوة الحالية",
  failed: "لم تتم",
  upcoming: "لاحقًا",
};

const circleClasses: Record<StepState, string> = {
  done: "bg-success text-white",
  current: "bg-white text-brand ring-2 ring-brand",
  failed: "bg-danger text-white",
  upcoming: "bg-surface text-body/40",
};

/** The line leading into a step: green once reached. */
const lineClasses: Record<StepState, string> = {
  done: "bg-success",
  current: "bg-success",
  failed: "bg-danger/40",
  upcoming: "bg-line",
};

interface BookingProgressProps {
  status: BookingStatus;
}

/** Where a booking stands: sent → the doctor's review → getting in touch. */
export function BookingProgress({ status }: BookingProgressProps) {
  const states = stepStates[status];

  return (
    <ol className="flex items-start">
      {bookingSteps.map((step, index) => {
        const state = states[index];
        return (
          <li key={step} aria-current={state === "current" ? "step" : undefined} className="relative flex flex-1 flex-col items-center text-center">
            {index > 0 && (
              <span aria-hidden="true" className={`absolute top-3.5 -start-1/2 h-0.5 w-full ${lineClasses[state]}`} />
            )}
            <span className={`relative flex size-7 items-center justify-center rounded-full ${circleClasses[state]}`}>
              {state === "done" && <Check aria-hidden="true" className="size-4" />}
              {state === "failed" && <X aria-hidden="true" className="size-4" />}
              {state === "current" && <span aria-hidden="true" className="size-2 rounded-full bg-brand" />}
            </span>
            <span className={`mt-2 px-1 text-xs font-bold ${state === "upcoming" ? "text-body/60" : "text-ink"}`}>{step}</span>
            <span className="sr-only">({stateLabels[state]})</span>
          </li>
        );
      })}
    </ol>
  );
}
