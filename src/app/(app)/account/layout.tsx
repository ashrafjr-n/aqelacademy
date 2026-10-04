import { Bell, MessageCircle, Ticket, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { SideNav, type SideNavItem } from "@/components/ui/side-nav";
import { accountCopy, accountSections } from "@/content/account";

const accountNav: SideNavItem[] = [
  { ...accountSections.bookings, icon: <Ticket aria-hidden="true" className="size-5" /> },
  { ...accountSections.messages, icon: <MessageCircle aria-hidden="true" className="size-5" /> },
  { ...accountSections.notifications, icon: <Bell aria-hidden="true" className="size-5" /> },
  { ...accountSections.profile, icon: <UserRound aria-hidden="true" className="size-5" /> },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container-site py-8 sm:py-12">
      <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SideNav items={accountNav} label={accountCopy.navLabel} />
        </aside>
        <div className="min-w-0 space-y-6">{children}</div>
      </div>
    </div>
  );
}
