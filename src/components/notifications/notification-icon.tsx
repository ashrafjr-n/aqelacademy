import { BadgeCheck, MessageCircle, Send, Ticket, type LucideIcon } from "lucide-react";
import type { NotificationType } from "@/content/notifications";

const typeIcons: Record<NotificationType, LucideIcon> = {
  booking_created: Ticket,
  booking_submitted: Send,
  booking_status_changed: BadgeCheck,
  message_received: MessageCircle,
};

interface NotificationIconProps {
  type: NotificationType;
  isRead: boolean;
}

export function NotificationIcon({ type, isRead }: NotificationIconProps) {
  const Icon = typeIcons[type];

  return (
    <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${isRead ? "bg-surface text-body" : "bg-brand-soft text-brand"}`}>
      <Icon aria-hidden="true" className="size-5" />
    </span>
  );
}
