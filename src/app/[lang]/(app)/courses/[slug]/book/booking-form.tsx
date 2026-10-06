"use client";

import { useActionState } from "react";
import { createBooking } from "@/app/[lang]/(app)/courses/[slug]/book/actions";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { TextAreaField } from "@/components/forms/text-area-field";
import { bookingCopy } from "@/content/bookings";
import { initialFormState } from "@/lib/forms";

interface BookingFormProps {
  courseSlug: string;
}

export function BookingForm({ courseSlug }: BookingFormProps) {
  const [state, formAction] = useActionState(createBooking, initialFormState);

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && <FormAlert tone="error" message={state.message} />}
      <input type="hidden" name="courseSlug" value={courseSlug} />
      <TextAreaField
        name="note"
        label="ملاحظة للدكتور"
        maxLength={500}
        hint={bookingCopy.noteHint}
        defaultValue={state.values?.note}
        error={state.fieldErrors?.note}
      />
      <SubmitButton label="تأكيد الحجز" pendingLabel="جارٍ إرسال الطلب…" />
    </form>
  );
}
