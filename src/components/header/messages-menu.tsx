"use client";

import { MessageCircle } from "lucide-react";
import { HeaderPopover, PanelHeader } from "@/components/header/header-popover";
import { MyConversationRow } from "@/components/messages/my-conversation-row";
import { messagesCopy } from "@/content/messages";
import type { PanelFeed } from "@/lib/dal/account-summary";
import type { MyConversation } from "@/lib/dal/messages";

interface MessagesMenuProps {
  feed: PanelFeed<MyConversation>;
  onRefresh: () => Promise<unknown>;
}

/** Each conversation opens the chat with the doctor about that booking. */
export function MessagesMenu({ feed, onRefresh }: MessagesMenuProps) {
  return (
    <HeaderPopover
      id="messages-panel"
      label={messagesCopy.inboxTitle}
      badge={feed.unread}
      trigger={<MessageCircle aria-hidden="true" className="size-5" />}
      onOpen={() => void onRefresh()}
    >
      <PanelHeader title={messagesCopy.inboxTitle} />
      {feed.items.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm leading-relaxed">
          {messagesCopy.noConversations} {messagesCopy.noConversationsText}
        </p>
      ) : (
        <ul className="divide-y divide-line">
          {feed.items.map((conversation) => (
            <li key={conversation.bookingId}>
              <MyConversationRow conversation={conversation} />
            </li>
          ))}
        </ul>
      )}
    </HeaderPopover>
  );
}
