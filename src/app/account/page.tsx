import { LogOut } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "@/app/account/actions";
import { ProfileForm } from "@/app/account/profile-form";
import { FormAlert } from "@/components/forms/form-alert";
import { buttonClassName } from "@/components/ui/button-styles";
import { getNotice } from "@/content/auth";
import { getMyProfile } from "@/lib/dal/profiles";

export const metadata: Metadata = {
  title: "حسابي",
  robots: { index: false },
};

export default async function AccountPage({ searchParams }: PageProps<"/account">) {
  const { notice } = await searchParams;
  const noticeMessage = getNotice(notice);
  const profile = await getMyProfile();

  return (
    <>
      {noticeMessage && <FormAlert tone={noticeMessage.tone} message={noticeMessage.text} />}

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
    </>
  );
}
