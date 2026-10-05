import { ExternalLink, LayoutDashboard, LogOut, MessageCircle, Ticket, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { signOut } from "@/app/(app)/account/actions";
import { AdminSidebarNav, AdminTabBar } from "@/components/admin/admin-nav";
import { AppFooter } from "@/components/layout/app-footer";
import { DoctorAvatar } from "@/components/messages/doctor-avatar";
import type { SideNavItem } from "@/components/ui/side-nav";
import { adminCopy, adminSections } from "@/content/admin";
import { site } from "@/content/site";
import { getAdminCounts, requireAdmin } from "@/lib/dal/admin";
import { getMyProfile } from "@/lib/dal/profiles";

export const metadata: Metadata = {
  title: adminCopy.title,
  robots: { index: false, follow: false },
};

const iconButtonClassName =
  "flex size-10 items-center justify-center rounded-full transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand";

const footerItemClassName =
  "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-start text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-brand";

/** The doctor's own app shell: sidebar on large screens, top bar and bottom tabs on phones. Larger text throughout. */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();
  const [counts, profile] = await Promise.all([getAdminCounts(), getMyProfile()]);
  const name = profile?.full_name ?? adminCopy.title;

  const nav: SideNavItem[] = [
    { ...adminSections.home, icon: <LayoutDashboard aria-hidden="true" className="size-5" /> },
    { ...adminSections.bookings, icon: <Ticket aria-hidden="true" className="size-5" />, badge: counts.pending },
    { ...adminSections.messages, icon: <MessageCircle aria-hidden="true" className="size-5" />, badge: counts.unreadMessages },
    { ...adminSections.students, icon: <Users aria-hidden="true" className="size-5" /> },
  ];

  return (
    <div className="flex flex-1 bg-canvas">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        تخطَّ إلى المحتوى
      </a>

      <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col self-start border-e border-line bg-white lg:flex">
        <Link href={adminSections.home.href} className="flex h-20 items-center gap-3 border-b border-line px-6">
          <Image src={site.logo.src} alt="" className="size-11" sizes="44px" />
          <span>
            <span className="block text-lg font-extrabold text-ink">{adminCopy.title}</span>
            <span className="block text-xs">{site.name}</span>
          </span>
        </Link>
        <div className="flex-1 overflow-y-auto p-4">
          <AdminSidebarNav items={nav} label={adminCopy.navLabel} />
        </div>
        <div className="space-y-1 border-t border-line p-4">
          <div className="mb-2 flex items-center gap-3 px-4">
            <DoctorAvatar size="sm" />
            <p className="truncate text-sm font-bold text-ink">{name}</p>
          </div>
          <Link href="/" className={`${footerItemClassName} text-ink hover:bg-surface`}>
            <ExternalLink aria-hidden="true" className="size-5 text-body/60" />
            {adminCopy.viewSite}
          </Link>
          <form action={signOut}>
            <button type="submit" className={`${footerItemClassName} text-danger hover:bg-danger-soft`}>
              <LogOut aria-hidden="true" className="size-5" />
              {adminCopy.signOut}
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur-md lg:hidden">
          <Link href={adminSections.home.href} className="flex items-center gap-2.5">
            <Image src={site.logo.src} alt="" className="size-10" sizes="40px" />
            <span className="text-lg font-extrabold text-ink">{adminCopy.title}</span>
          </Link>
          <div className="ms-auto flex items-center gap-1">
            <Link href="/" aria-label={adminCopy.viewSite} className={`${iconButtonClassName} text-ink`}>
              <ExternalLink aria-hidden="true" className="size-5" />
            </Link>
            <form action={signOut}>
              <button type="submit" aria-label={adminCopy.signOut} className={`${iconButtonClassName} text-danger`}>
                <LogOut aria-hidden="true" className="size-5" />
              </button>
            </form>
          </div>
        </header>

        <main id="main" className="flex-1 px-4 py-6 text-lg sm:px-8 sm:py-10">
          <div className="mx-auto max-w-5xl space-y-8">{children}</div>
        </main>
        <div className="pb-20 lg:pb-0">
          <AppFooter />
        </div>
      </div>

      <AdminTabBar items={nav} label={adminCopy.navLabel} />
    </div>
  );
}
