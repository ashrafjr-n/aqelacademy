"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface TurnstileOptions {
  sitekey: string;
  language: string;
  size: "flexible";
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

interface TurnstileWidgetProps {
  siteKey: string;
}

/**
 * Cloudflare Turnstile captcha. Its one-time token is posted as `captchaToken`
 * and verified by Supabase Auth. Remount (change `key`) to get a fresh token after a submit.
 */
export function TurnstileWidget({ siteKey }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    if (!isScriptReady || !container || !window.turnstile) return;

    const widgetId = window.turnstile.render(container, {
      sitekey: siteKey,
      language: "ar",
      size: "flexible",
      callback: setToken,
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
    return () => window.turnstile?.remove(widgetId);
  }, [isScriptReady, siteKey]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setIsScriptReady(true)}
      />
      <div ref={containerRef} className="min-h-16" />
      <input type="hidden" name="captchaToken" value={token} />
    </>
  );
}
