"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { inputClassName } from "@/components/forms/field";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { sendMessageAction } from "@/components/messages/actions";
import { MESSAGE_MAX_LENGTH, messagesCopy } from "@/content/messages";
import { initialFormState } from "@/lib/forms";

interface MessageComposerProps {
  bookingId: string;
}

export function MessageComposer({ bookingId }: MessageComposerProps) {
  const [state, formAction] = useActionState(sendMessageAction, initialFormState);
  const fieldId = `message-${bookingId}`;

  return (
    <form action={formAction} noValidate className="space-y-2">
      {state.status === "error" && state.message && <FormAlert tone="error" message={state.message} />}
      <input type="hidden" name="bookingId" value={bookingId} />
      <label htmlFor={fieldId} className="sr-only">
        {messagesCopy.composerLabel}
      </label>
      <div className="flex items-end gap-2">
        <textarea
          id={fieldId}
          name="body"
          rows={2}
          maxLength={MESSAGE_MAX_LENGTH}
          required
          placeholder={messagesCopy.composerPlaceholder}
          defaultValue={state.values?.body}
          aria-describedby={`${fieldId}-hint`}
          className={`${inputClassName} min-h-12 flex-1 resize-none px-4 leading-relaxed`}
        />
        <SubmitButton label={messagesCopy.send} pendingLabel={messagesCopy.sending} icon={<Send aria-hidden="true" className="size-4" />} fullWidth={false} />
      </div>
      <p id={`${fieldId}-hint`} className="text-xs">
        {messagesCopy.composerHint}
      </p>
    </form>
  );
}
