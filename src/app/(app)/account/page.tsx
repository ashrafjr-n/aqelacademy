import { LayoutDashboard, LogOut, Trash2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteAccount, signOut } from "@/app/(app)/account/actions";
import { ProfileForm } from "@/app/(app)/account/profile-form";
import { ConfirmSubmitButton } from "@/components/forms/confirm-submit-button";
import { FormAlert } from "@/components/forms/form-alert";
import { buttonClassName } from "@/components/ui/button-styles";
import { adminCopy } from "@/content/admin";
import { getNotice } from "@/content/notices";
import { getAdminStatus } from "@/lib/dal/admin";
import { getMyProfile } from "@/lib/dal/profiles";

export const metadata: Metadata = {
  title: "حسابي",
  robots: { index: false },
};

export default async function AccountPage({ searchParams }: PageProps<"/account">) {
  const { notice } = await searchParams;
  const noticeMessage = getNotice(notice);
  const profile = await getMyProfile();
  // Any admin account (whatever the sign-in method) sees the dashboard link and can't self-delete.
  const isAdmin = (await getAdminStatus()) !== "none";

  return (
    <>
      {noticeMessage && <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />}

      {isAdmin && (
        <Link
          href="/admin"
          className="flex items-center gap-4 rounded-3xl border border-brand bg-brand-soft p-6 font-bold text-ink transition-shadow hover:shadow-md"
        >
          <LayoutDashboard aria-hidden="true" className="size-7 text-brand" />
          <span className="text-lg">{adminCopy.title}</span>
        </Link>
      )}

      {profile ? (
        <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink">مرحبًا، {profile.full_name}</h2>
          <p className="mt-1 text-sm">
            البريد الإلكتروني: <span dir="ltr">{profile.email}</span>
          </p>
          <div className="mt-6">
            <ProfileForm fullName={profile.full_name} phone={profile.phone} country={profile.country} />
          </div>
        </section>
      ) : (
        <FormAlert tone="error" message="تعذّر تحميل بيانات حسابك. حاول تحديث الصفحة." />
      )}

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-white p-6 sm:p-8">
        <Link href="/reset-password" className="font-semibold text-brand hover:text-brand-dark">
          تغيير كلمة المرور
        </Link>
        <form action={signOut}>
          <button type="submit" className={buttonClassName("outline")}>
            <LogOut aria-hidden="true" className="size-4" />
            تسجيل الخروج
          </button>
        </form>
      </section>

      {!isAdmin && (
        <section className="space-y-4 rounded-3xl border border-danger/30 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-danger">حذف الحساب</h2>
          <p className="leading-relaxed">يحذف حسابك وبياناتك وحجوزاتك ورسائلك نهائيًا، ولا يمكن التراجع عن ذلك.</p>
          <form action={deleteAccount}>
            <ConfirmSubmitButton label="حذف حسابي نهائيًا" question="متأكد؟ لا يمكن التراجع." icon={<Trash2 aria-hidden="true" className="size-5" />} />
          </form>
        </section>
      )}
    </>
  );
}
