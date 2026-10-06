"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, useTransition } from "react";
import { signInWithGoogle } from "@/app/[lang]/(app)/(auth)/actions";
import { FormAlert } from "@/components/forms/form-alert";

interface GoogleIdConfiguration {
  client_id: string;
  nonce: string;
  ux_mode: "popup";
  context: "signin";
  callback: (response: { credential: string }) => void;
}

interface GoogleButtonOptions {
  type: "standard";
  theme: "outline";
  size: "large";
  text: "continue_with";
  shape: "pill";
  locale: string;
  width: number;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleIdConfiguration) => void;
          renderButton: (parent: HTMLElement, options: GoogleButtonOptions) => void;
          cancel: () => void;
        };
      };
    };
  }
}

/** Random nonce for this attempt, and its SHA-256 (hex) that Google embeds in the ID token. */
async function createNonce(): Promise<{ raw: string; hashed: string }> {
  const raw = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  const hashed = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return { raw, hashed };
}

interface GoogleSignInButtonProps {
  clientId: string;
  nextPath: string;
}

export function GoogleSignInButton({ clientId, nextPath }: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const container = containerRef.current;
    if (!isScriptReady || !container || !window.google) return;
    let isActive = true;

    createNonce().then(({ raw, hashed }) => {
      if (!isActive || !window.google) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        nonce: hashed,
        ux_mode: "popup",
        context: "signin",
        callback: ({ credential }) => {
          setError("");
          startTransition(async () => {
            const message = await signInWithGoogle(credential, raw, nextPath);
            setError(message);
          });
        },
      });
      window.google.accounts.id.renderButton(container, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
        locale: "ar",
        width: Math.min(400, Math.max(200, container.offsetWidth)),
      });
    });

    return () => {
      isActive = false;
      window.google?.accounts.id.cancel();
    };
  }, [isScriptReady, clientId, nextPath]);

  return (
    <div className="space-y-3">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onReady={() => setIsScriptReady(true)} />
      {error && <FormAlert tone="error" message={error} />}
      <div ref={containerRef} aria-busy={isPending} className={`flex min-h-11 justify-center ${isPending ? "pointer-events-none opacity-60" : ""}`} />
      <p className="text-center text-xs leading-relaxed">
        بالمتابعة باستخدام Google، أنت توافق على{" "}
        <Link href="/policy" target="_blank" className="font-bold text-brand underline hover:text-brand-dark">
          سياسة الخصوصية
        </Link>
        .
      </p>
    </div>
  );
}
