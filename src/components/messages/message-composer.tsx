"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { TextAreaField } from "@/components/forms/text-area-field";
import { sendMessageAction } from "@/components/messages/actions";
import { MESSAGE_MAX_LENGTH, messagesCopy } from "@/content/messages";
import { initialFormState } from "@/lib/forms";

interface MessageComposerProps {
  bookingId: string;
}

export function MessageComposer({ bookingId }: MessageComposerProps) {
  const [state, formAction] = useActionState(sendMessageAction, initialFormState);

  return (
    <form action={formAction} noValidate className="space-y-4">
      {state.status === "error" && state.message && <FormAlert tone="error" message={state.message} />}
      <input type="hidden" name="bookingId" value={bookingId} />
      <TextAreaField
        name="body"
        label={messagesCopy.composerLabel}
        maxLength={MESSAGE_MAX_LENGTH}
        required
        hint={messagesCopy.composerHint}
        defaultValue={state.values?.body}
      />
      <SubmitButton label={messagesCopy.send} pendingLabel={messagesCopy.sending} icon={Send} />
    </form>
  );
}
