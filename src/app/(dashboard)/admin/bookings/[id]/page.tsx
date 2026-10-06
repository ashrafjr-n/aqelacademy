import { notFound } from "next/navigation";
import { z } from "zod";
import { AdminBookingCard } from "@/components/admin/admin-booking-card";
import { FormAlert } from "@/components/forms/form-alert";
import { ConversationPanel } from "@/components/messages/conversation-panel";
import { Avatar } from "@/components/ui/avatar";
import { BackLink } from "@/components/ui/back-link";
import { adminSections } from "@/content/admin";
import { getCourse } from "@/content/courses";
import { messagesCopy } from "@/content/messages";
import { getNotice } from "@/content/notices";
import { getAdminConversation } from "@/lib/dal/messages";

/** A booking's details and decisions next to the conversation with the student (stacked on phones, decisions first). */
export default async function AdminBookingPage({ params, searchParams }: PageProps<"/admin/bookings/[id]">) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const { notice } = await searchParams;
  const noticeMessage = getNotice(notice);
  const conversation = await getAdminConversation(id);
  const studentName = conversation.booking.student?.full_name ?? "حساب محذوف";

  return (
    <>
      <BackLink href={adminSections.bookings.href} label="كل الطلبات" />
      {noticeMessage && <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="xl:sticky xl:top-6 xl:order-last">
          <AdminBookingCard booking={conversation.booking} returnTo="detail" />
        </div>
        <ConversationPanel
          conversation={conversation}
          counterpart={{ name: studentName, subtitle: getCourse(conversation.booking.course_slug)?.title, avatar: <Avatar name={studentName} /> }}
          emptyText={messagesCopy.emptyAdmin}
        />
      </div>
    </>
  );
}
