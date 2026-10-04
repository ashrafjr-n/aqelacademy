"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode, ToggleEvent } from "react";

const triggerClassName =
  "relative flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand";

// Native popover: the browser handles outside clicks, Escape and returning focus. It renders in the
// top layer, so it's placed under the sticky header and aligned with the container's left edge,
// where the header's buttons sit in RTL.
const panelClassName =
  "fixed inset-auto top-[4.5rem] left-4 m-0 max-h-[calc(100dvh-5.5rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-0 text-body shadow-pop sm:left-[max(1rem,calc((100vw-72rem)/2+1rem))] opacity-0 transition-[opacity,translate,overlay,display] transition-discrete duration-150 -translate-y-1 open:translate-y-0 open:opacity-100 starting:open:-translate-y-1 starting:open:opacity-0";

interface HeaderPopoverProps {
  id: string;
  label: string;
  /** The trigger's content: an icon or avatar element. */
  trigger: ReactNode;
  /** Unread count shown on the trigger; hidden at 0. */
  badge?: number;
  /** Replaces the round icon-button look (the account trigger is wider). */
  triggerClass?: string;
  onOpen?: () => void;
  children: ReactNode;
}

/** A header button that opens a panel under the header. Following a link or submitting a form inside closes it. */
export function HeaderPopover({ id, label, trigger, badge = 0, triggerClass = triggerClassName, onOpen, children }: HeaderPopoverProps) {
  function handleToggle(event: ToggleEvent<HTMLDivElement>) {
    if (event.newState === "open") onOpen?.();
  }

  function closeOnLink(event: MouseEvent<HTMLDivElement>) {
    if (event.target instanceof Element && event.target.closest("a")) event.currentTarget.hidePopover();
  }

  return (
    <>
      <button type="button" popoverTarget={id} aria-label={badge > 0 ? `${label}: ${badge} جديد` : label} className={triggerClass}>
        {trigger}
        {badge > 0 && (
          <span aria-hidden="true" className="absolute -top-0.5 -end-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[0.6875rem] font-bold text-white ring-2 ring-white">
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </button>
      <div
        id={id}
        popover="auto"
        aria-label={label}
        onToggle={handleToggle}
        onClick={closeOnLink}
        onSubmit={(event) => event.currentTarget.hidePopover()}
        className={panelClassName}
      >
        {children}
      </div>
    </>
  );
}

interface PanelHeaderProps {
  title: string;
  action?: ReactNode;
}

export function PanelHeader({ title, action }: PanelHeaderProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3">
      <p className="font-bold text-ink">{title}</p>
      {action}
    </div>
  );
}

interface PanelFooterLinkProps {
  href: string;
  children: ReactNode;
}

export function PanelFooterLink({ href, children }: PanelFooterLinkProps) {
  return (
    <Link href={href} className="block border-t border-line px-4 py-3 text-center text-sm font-bold text-brand transition-colors hover:bg-canvas hover:text-brand-dark">
      {children}
    </Link>
  );
}
