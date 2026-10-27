import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-cream shadow-soft transition hover:scale-105">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
