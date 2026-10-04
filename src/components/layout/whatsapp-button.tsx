import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-5 start-5 z-30 flex items-center gap-2 rounded-full bg-whatsapp-dark px-4 py-3 font-bold text-white shadow-lift transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp-dark"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
      <span className="hidden sm:inline">واتساب</span>
    </a>
  );
}
