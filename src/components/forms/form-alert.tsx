import { CircleAlert, CircleCheck } from "lucide-react";

interface FormAlertProps {
  tone: "error" | "success";
  message: string;
}

export function FormAlert({ tone, message }: FormAlertProps) {
  const isError = tone === "error";
  const Icon = isError ? CircleAlert : CircleCheck;

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex items-start gap-3 rounded-xl p-4 text-sm leading-relaxed ${isError ? "bg-danger-soft text-danger" : "bg-success-soft text-success"}`}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
