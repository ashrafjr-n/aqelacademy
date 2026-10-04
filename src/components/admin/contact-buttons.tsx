import { Mail, MessageCircle, Phone } from "lucide-react";
import { buttonClassName } from "@/components/ui/button-styles";
import { whatsappLinkTo } from "@/lib/whatsapp";

interface ContactButtonsProps {
  email: string;
  phone: string | null;
  whatsappMessage: string;
  noPhoneText: string;
}

/** One-tap ways for the doctor to reach a student. */
export function ContactButtons({ email, phone, whatsappMessage, noPhoneText }: ContactButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {phone ? (
        <>
          <a href={whatsappLinkTo(phone, whatsappMessage)} target="_blank" rel="noopener noreferrer" className={buttonClassName("whatsapp")}>
            <MessageCircle aria-hidden="true" className="size-5" />
            واتساب
          </a>
          <a href={`tel:${phone}`} className={buttonClassName("outline")}>
            <Phone aria-hidden="true" className="size-5" />
            <span dir="ltr">{phone}</span>
          </a>
        </>
      ) : (
        <span className="text-sm">{noPhoneText}</span>
      )}
      <a href={`mailto:${email}`} className={buttonClassName("outline")}>
        <Mail aria-hidden="true" className="size-5" />
        بريد إلكتروني
      </a>
    </div>
  );
}
