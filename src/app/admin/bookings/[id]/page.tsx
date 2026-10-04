import { notFound } from "next/navigation";
import { z } from "zod";
import { AdminBookingCard } from "@/components/admin/admin-booking-card";
import { FormAlert } from "@/components/forms/form-alert";
import { ConversationPanel } from "@/components/messages/conversation-panel";
import { BackLink } from "@/components/ui/back-link";
import { messagesCopy } from "@/content/messages";
import { getNotice } from "@/content/notices";
import { getAdminConversation } from "@/lib/dal/messages";

export default async function AdminBookingPage({ params, searchParams }: PageProps<"/admin/bookings/[id]">) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const { notice } = await searchParams;
  const noticeMessage = getNotice(notice);
  const conversation = await getAdminConversation(id);

  return (
    <>
      <BackLink href="/admin/bookings" label="كل الطلبات" />
      {noticeMessage && <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />}
      <AdminBookingCard booking={conversation.booking} returnTo="detail" />
      <ConversationPanel conversation={conversation} emptyText={messagesCopy.emptyAdmin} />
    </>
  );
}
