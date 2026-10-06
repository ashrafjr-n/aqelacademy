"use client";

import { CircleAlert, LoaderCircle, ShieldCheck } from "lucide-react";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { formsCopy } from "@/content/forms";

interface TurnstileOptions {
  sitekey: string;
  language: string;
  size: "flexible";
  appearance: "interaction-only";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
    };
  }
}

type CaptchaStatus = "checking" | "verified" | "failed";

interface TurnstileWidgetProps {
  siteKey: string;
}

/**
 * Cloudflare Turnstile captcha, invisible unless Cloudflare needs the visitor to interact.
 * Its one-time token is posted as `captchaToken` and verified by Supabase Auth.
 * Remount (change `key`) to get a fresh token after a submit.
 */
export function TurnstileWidget({ siteKey }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<CaptchaStatus>("checking");
  const locale = useLocale();

  useEffect(() => {
    const container = containerRef.current;
    if (!isScriptReady || !container || !window.turnstile) return;

    const widgetId = window.turnstile.render(container, {
      sitekey: siteKey,
      language: locale,
      size: "flexible",
      appearance: "interaction-only",
      callback: (newToken) => {
        setToken(newToken);
        setStatus("verified");
      },
      "expired-callback": () => {
        setToken("");
        setStatus("checking");
      },
      "error-callback": () => {
        setToken("");
        setStatus("failed");
      },
    });
    return () => window.turnstile?.remove(widgetId);
  }, [isScriptReady, siteKey, locale]);

  return (
    <div>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setIsScriptReady(true)}
      />
      <div ref={containerRef} />
      <input type="hidden" name="captchaToken" value={token} />
      <CaptchaStatusLine status={status} />
    </div>
  );
}

const statusStyles = {
  checking: { icon: LoaderCircle, className: "text-body [&>svg]:animate-spin" },
  verified: { icon: ShieldCheck, className: "text-success" },
  failed: { icon: CircleAlert, className: "text-danger" },
} as const;

function CaptchaStatusLine({ status }: { status: CaptchaStatus }) {
  const { icon: Icon, className } = statusStyles[status];
  const text = formsCopy[useLocale()].captcha[status];

  return (
    <p aria-live="polite" className={`flex items-center gap-1.5 text-xs ${className}`}>
      <Icon aria-hidden="true" className="size-4" />
      {text}
    </p>
  );
}
