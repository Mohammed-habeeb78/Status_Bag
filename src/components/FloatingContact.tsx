import { Phone } from "lucide-react";
import { telLink, whatsappLink, siteConfig } from "../config/siteConfig";
import { WhatsAppIcon } from "./BrandIcons";

/** Fixed bottom-right WhatsApp (green) and call (gold) buttons, shown on every page. */
export default function FloatingContact() {
  return (
    <div className="float-contact">
      <a
        href={whatsappLink(siteConfig.whatsappDefaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn whatsapp"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>
      <a href={telLink} className="float-btn call" aria-label={`Call ${siteConfig.phoneDisplay}`} title="Call us">
        <Phone size={24} />
      </a>
    </div>
  );
}
