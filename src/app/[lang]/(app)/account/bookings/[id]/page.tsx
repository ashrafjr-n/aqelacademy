import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";
import { BookingSummary } from "@/components/bookings/booking-summary";
import { ConversationPanel } from "@/components/messages/conversation-panel";
import { DoctorAvatar } from "@/components/messages/doctor-avatar";
import { BackLink } from "@/components/ui/back-link";
import { cardClassName } from "@/components/ui/card";
import { bookingCopy } from "@/content/bookings";
import { getCourse, instructors } from "@/content/courses";
import { messagesCopy } from "@/content/messages";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { getMyConversation } from "@/lib/dal/messages";

export async function generateMetadata(): Promise<Metadata> {
  return { title: bookingCopy[await getLocale()].openDetails, robots: { index: false } };
}

/** One booking: where it stands, and the conversation with the doctor about it. */
export default async function MyBookingPage({ params }: PageProps<"/[lang]/account/bookings/[id]">) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const locale = await getLocale();
  const conversation = await getMyConversation(id);
  const { booking } = conversation;
  const courseTitle = getCourse(booking.course_slug, locale)?.title ?? booking.course_slug;

  return (
    <>
      <BackLink href={localePath(locale, `/courses/${booking.course_slug}`)} label={courseTitle} />

      <section className={`${cardClassName} overflow-hidden`}>
        <BookingSummary booking={booking} headingLevel="h1" />
      </section>

      <ConversationPanel
        conversation={conversation}
        counterpart={{ name: instructors[locale].name, subtitle: courseTitle, avatar: <DoctorAvatar /> }}
        emptyText={messagesCopy[locale].empty}
        locale={locale}
      />
    </>
  );
}
