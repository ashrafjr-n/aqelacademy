"use client";

import { ChevronDown, LogOut, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { HeaderPopover } from "@/components/header/header-popover";
import { useLocale } from "@/components/locale-provider";
import { Avatar } from "@/components/ui/avatar";
import { siteText } from "@/content/site";
import { localePath } from "@/lib/i18n";

/** The round pill in the header's corner: the student's account menu, or the doctor's dashboard link. */
export const accountTriggerClassName =
  "flex h-10 items-center gap-2 rounded-full border border-line bg-white ps-1 pe-1 text-ink transition-colors hover:border-ink/25 sm:pe-3 focus-visible:outline-2 focus-visible:outline-brand";

const itemClassName =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand";

interface AccountMenuProps {
  name: string;
  email: string;
  onSignOut: () => Promise<void>;
}

export function AccountMenu({ name, email, onSignOut }: AccountMenuProps) {
  const locale = useLocale();
  const accountLink = siteText[locale].account;

  return (
    <HeaderPopover
      id="account-menu"
      label={accountLink.label}
      triggerClass={accountTriggerClassName}
      trigger={
        <>
          <Avatar name={name} size="sm" />
          <span className="hidden text-sm font-bold sm:inline">{accountLink.label}</span>
          <ChevronDown aria-hidden="true" className="hidden size-4 text-body sm:block" />
        </>
      }
    >
      <div className="flex items-center gap-3 border-b border-line p-4">
        <Avatar name={name} />
        <div className="min-w-0">
          <p className="truncate font-bold text-ink">{name}</p>
          <p dir="ltr" className="truncate text-end text-xs">
            {email}
          </p>
        </div>
      </div>
      <div className="p-2">
        <Link href={localePath(locale, accountLink.href)} className={`${itemClassName} text-ink hover:bg-surface`}>
          <UserRoundPen aria-hidden="true" className="size-5 text-body" />
          تعديل الملف الشخصي
        </Link>
        <form action={onSignOut}>
          <button type="submit" className={`${itemClassName} text-danger hover:bg-danger-soft`}>
            <LogOut aria-hidden="true" className="size-5" />
            تسجيل الخروج
          </button>
        </form>
      </div>
    </HeaderPopover>
  );
}
