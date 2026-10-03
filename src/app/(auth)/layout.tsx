import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CheckList } from "@/components/ui/check-list";
import { authPanel } from "@/content/auth";
import { site } from "@/content/site";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="bg-surface py-10 sm:py-16">
      <div className="container-site">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-line bg-white shadow-sm lg:grid-cols-[1.1fr_1fr]">
          <div className="p-6 sm:p-10">
            <Link href="/" className="mb-8 flex justify-center lg:hidden">
              <Image src={site.logo.src} alt={site.logo.alt} sizes="64px" className="size-16" />
            </Link>
            {children}
          </div>

          <aside className="hidden flex-col justify-between gap-10 bg-ink p-10 text-white lg:flex">
            <div>
              <div className="flex size-20 items-center justify-center rounded-full bg-white p-1.5">
                <Image src={site.logo.src} alt={site.logo.alt} sizes="80px" className="size-full" />
              </div>
              <h2 className="mt-8 text-2xl font-bold leading-relaxed">{authPanel.title}</h2>
              <div className="mt-6 text-white/90">
                <CheckList items={authPanel.points} />
              </div>
            </div>
            <p className="flex items-center gap-2 text-sm text-white/70">
              <ShieldCheck aria-hidden="true" className="size-5 text-brand" />
              {authPanel.security}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
