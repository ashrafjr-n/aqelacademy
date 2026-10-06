import { ChevronLeft, KeyRound, LayoutDashboard, LogOut, Trash2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteAccount, signOut } from "@/app/[lang]/(app)/account/actions";
import { ProfileForm } from "@/app/[lang]/(app)/account/profile-form";
import { ConfirmSubmitButton } from "@/components/forms/confirm-submit-button";
import { FormAlert } from "@/components/forms/form-alert";
import { DoctorAvatar } from "@/components/messages/doctor-avatar";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button-link";
import { buttonClassName } from "@/components/ui/button-styles";
import { Card, cardClassName } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { accountCopy } from "@/content/account";
import { getNotice } from "@/content/notices";
import { getAdminStatus } from "@/lib/dal/admin";
import { getMyProfile } from "@/lib/dal/profiles";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return { title: accountCopy[await getLocale()].title, robots: { index: false } };
}

export default async function AccountPage({ searchParams }: PageProps<"/[lang]/account">) {
  const { notice } = await searchParams;
  const locale = await getLocale();
  const copy = accountCopy[locale];
  const noticeMessage = getNotice(notice, locale);
  const profile = await getMyProfile();
  // Any admin account (whatever the sign-in method) sees the dashboard link and can't self-delete.
  const isAdmin = (await getAdminStatus()) !== "none";

  return (
    <>
      <PageTitle title={copy.title} description={copy.profileDescription} />
      {noticeMessage && <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />}

      {isAdmin && (
        <Link href="/admin" className={`${cardClassName} flex items-center gap-4 p-5 transition-shadow hover:shadow-lift`}>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
            <LayoutDashboard aria-hidden="true" className="size-6" />
          </span>
          <span className="flex-1">
            <span className="block font-bold text-ink">{copy.dashboard}</span>
            <span className="block text-sm">{copy.adminCard}</span>
          </span>
          <ChevronLeft aria-hidden="true" className="size-5 text-body ltr:rotate-180" />
        </Link>
      )}

      {profile ? (
        <Card title={copy.personalInfo}>
          <div className="mb-6 flex items-center gap-4 rounded-xl bg-canvas p-4">
            {isAdmin ? <DoctorAvatar size="lg" /> : <Avatar name={profile.full_name} size="lg" />}
            <div className="min-w-0">
              <p className="truncate font-bold text-ink">{profile.full_name}</p>
              <p dir="ltr" className="truncate text-end text-sm">
                {profile.email}
              </p>
            </div>
          </div>
          <ProfileForm fullName={profile.full_name} phone={profile.phone} country={profile.country} />
        </Card>
      ) : (
        <FormAlert tone="error" message={copy.loadFailed} />
      )}

      <Card title={copy.security} description={copy.securityText}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={localePath(locale, "/reset-password")} variant="outline">
            <KeyRound aria-hidden="true" className="size-4" />
            {copy.changePassword}
          </ButtonLink>
          <form action={signOut}>
            <button type="submit" className={buttonClassName("outline")}>
              <LogOut aria-hidden="true" className="size-4" />
              {copy.signOut}
            </button>
          </form>
        </div>
      </Card>

      {!isAdmin && (
        <Card title={copy.deleteTitle} description={copy.deleteText} tone="danger">
          <form action={deleteAccount}>
            <ConfirmSubmitButton label={copy.deleteButton} question={copy.deleteQuestion} icon={<Trash2 aria-hidden="true" className="size-5" />} />
          </form>
        </Card>
      )}
    </>
  );
}
