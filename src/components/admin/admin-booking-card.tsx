import { BookOpen, CalendarDays, Check, Globe, MessageCircle, RotateCcw, X } from "lucide-react";
import type { ReactNode } from "react";
import { decideBooking } from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/forms/confirm-submit-button";
import { ContactButtons } from "@/components/admin/contact-buttons";
import { SubmitButton } from "@/components/forms/submit-button";
import { ButtonLink } from "@/components/ui/button-link";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminCopy, adminWhatsAppMessage } from "@/content/admin";
import { messagesCopy } from "@/content/messages";
import { bookingStatuses, type BookingStatus } from "@/content/bookings";
import { countries } from "@/content/countries";
import { getCourse } from "@/content/courses";
import type { AdminBooking } from "@/lib/dal/admin";
import { formatDate } from "@/lib/format";

interface AdminBookingCardProps {
  booking: AdminBooking;
  /** Where the doctor lands after a decision: the list this card is in, or the booking's own page. */
  returnTo: DecisionReturn;
}

type DecisionReturn = BookingStatus | "detail";

interface DecisionFormProps {
  bookingId: string;
  decision: BookingStatus;
  returnTo: DecisionReturn;
  children: ReactNode;
}

function DecisionForm({ bookingId, decision, returnTo, children }: DecisionFormProps) {
  return (
    <form action={decideBooking}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="decision" value={decision} />
      <input type="hidden" name="returnTo" value={returnTo} />
      {children}
    </form>
  );
}

export function AdminBookingCard({ booking, returnTo }: AdminBookingCardProps) {
  const student = booking.student;
  const studentName = student?.full_name ?? "حساب محذوف";
  const courseTitle = getCourse(booking.course_slug)?.title ?? booking.course_slug;
  const countryName = countries.find((country) => country.code === student?.country)?.name;
  const statusInfo = bookingStatuses[booking.status];
  const firstName = studentName.split(" ")[0];

  return (
    <article className="space-y-5 rounded-3xl border border-line bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-xl font-bold text-ink">{studentName}</h2>
        <StatusBadge tone={statusInfo.tone} label={statusInfo.label} />
      </div>

      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <BookOpen aria-hidden="true" className="size-5 shrink-0 text-brand" />
          {courseTitle}
        </li>
        <li className="flex items-center gap-2">
          <CalendarDays aria-hidden="true" className="size-5 shrink-0 text-brand" />
          طلب في <time dateTime={booking.created_at}>{formatDate(booking.created_at)}</time>
        </li>
        {countryName && (
          <li className="flex items-center gap-2">
            <Globe aria-hidden="true" className="size-5 shrink-0 text-brand" />
            {countryName}
          </li>
        )}
      </ul>

      {booking.user_note && (
        <p className="rounded-2xl bg-surface p-4 leading-relaxed">
          <span className="font-bold text-ink">{adminCopy.noteLabel}: </span>
          {booking.user_note}
        </p>
      )}

      {student && (
        <ContactButtons
          email={student.email}
          phone={student.phone}
          whatsappMessage={adminWhatsAppMessage(firstName, courseTitle)}
          noPhoneText={adminCopy.noPhone}
        />
      )}

      {returnTo !== "detail" && (
        <ButtonLink href={`/admin/bookings/${booking.id}`} variant="outline">
          <MessageCircle aria-hidden="true" className="size-5" />
          {messagesCopy.openConversation}
        </ButtonLink>
      )}

      <div className="flex flex-wrap gap-3 border-t border-line pt-5">
        {booking.status !== "approved" && (
          <DecisionForm bookingId={booking.id} decision="approved" returnTo={returnTo}>
            <SubmitButton label="موافقة" pendingLabel="جارٍ الحفظ…" variant="success" icon={<Check aria-hidden="true" className="size-5" />} fullWidth={false} />
          </DecisionForm>
        )}
        {booking.status !== "rejected" && (
          <DecisionForm bookingId={booking.id} decision="rejected" returnTo={returnTo}>
            <ConfirmSubmitButton label="رفض" question="رفض هذا الطلب؟" icon={X} />
          </DecisionForm>
        )}
        {booking.status !== "pending" && (
          <DecisionForm bookingId={booking.id} decision="pending" returnTo={returnTo}>
            <ConfirmSubmitButton label="إعادة للانتظار" question="إعادة الطلب للانتظار؟" icon={RotateCcw} variant="outline" />
          </DecisionForm>
        )}
      </div>
    </article>
  );
}
