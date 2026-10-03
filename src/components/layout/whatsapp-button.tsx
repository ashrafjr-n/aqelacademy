import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-5 start-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-bold text-white shadow-lg transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
      <span className="hidden sm:inline">واتساب</span>
    </a>
  );
}
