"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeaderPopover, PanelHeader } from "@/components/header/header-popover";
import { useLocale } from "@/components/locale-provider";
import { buttonClassName } from "@/components/ui/button-styles";
import { authCopy } from "@/content/auth";

interface GuestMenuProps {
  id: string;
  title: string;
  /** The trigger's rendered icon element. */
  icon: ReactNode;
  text: string;
  loginHref: string;
}

/** What the notifications and messages buttons open before signing in: a short note and a sign-in link. */
export function GuestMenu({ id, title, icon, text, loginHref }: GuestMenuProps) {
  const signIn = authCopy[useLocale()].login.title;

  return (
    <HeaderPopover id={id} label={title} trigger={icon}>
      <PanelHeader title={title} />
      <div className="px-4 py-8 text-center">
        <p className="text-sm leading-relaxed">{text}</p>
        <Link href={loginHref} className={`${buttonClassName("primary")} mt-5`}>
          <LogIn aria-hidden="true" className="size-4" />
          {signIn}
        </Link>
      </div>
    </HeaderPopover>
  );
}
