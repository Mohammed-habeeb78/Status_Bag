import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  siteConfig,
  telLink,
  whatsappLink,
  mailLink,
  configuredSocials,
} from "../config/siteConfig";
import { WhatsAppIcon, InstagramIcon, FacebookIcon, LinkedInIcon, YouTubeIcon } from "../components/BrandIcons";

const socialIcon = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
} as const;

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Builds the text used for WhatsApp and email. This form does NOT submit to any server. */
function buildMessage(f: FormState): string {
  return [
    "New enquiry from the STATUS BAG INDUSTRIES website",
    "",
    `Name: ${f.name.trim()}`,
    `Email: ${f.email.trim() || "-"}`,
    `Phone: ${f.phone.trim() || "-"}`,
    "",
    "Message:",
    f.message.trim(),
  ].join("\n");
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const socials = configuredSocials();

  const update = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Opens WhatsApp with the enquiry pre-filled. The visitor presses Send themselves.
  const sendViaWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappLink(buildMessage(form)), "_blank", "noopener,noreferrer");
  };

  // Opens the visitor's email app with the enquiry pre-filled.
  const sendViaEmail = () => {
    if (!validate()) return;
    window.location.href = mailLink(`Website enquiry from ${form.name.trim()}`, buildMessage(form));
  };

  const mapSearchUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(siteConfig.address.oneLine)}`;

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Call, message on WhatsApp or send us an email. We are happy to help.</p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          {/* Contact information */}
          <div className="contact-info">
            <div className="contact-item">
              <div className="ci-icon"><Phone size={18} /></div>
              <div>
                <h4>Phone</h4>
                <a href={telLink}>{siteConfig.phoneDisplay}</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="ci-icon"><WhatsAppIcon size={18} /></div>
              <div>
                <h4>WhatsApp</h4>
                <a href={whatsappLink(siteConfig.whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer">
                  +{siteConfig.whatsappNumber}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="ci-icon"><Mail size={18} /></div>
              <div>
                <h4>Email</h4>
                <a href={mailLink()}>{siteConfig.email}</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="ci-icon"><MapPin size={18} /></div>
              <div>
                <h4>Address</h4>
                <p>
                  {siteConfig.address.lines.map((line) => (
                    <span key={line} style={{ display: "block" }}>{line}</span>
                  ))}
                </p>
              </div>
            </div>

            {socials.length > 0 && (
              <div className="contact-item">
                <div className="ci-icon" style={{ background: "transparent" }} />
                <div>
                  <h4>Follow Us</h4>
                  <div className="social-row">
                    {socials.map((s) => {
                      const Icon = socialIcon[s.key];
                      return (
                        <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                          <Icon size={16} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="map-box">
            {siteConfig.mapEmbedUrl ? (
              <iframe
                title={`Map showing ${siteConfig.businessName}`}
                src={siteConfig.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map-placeholder">
                <MapPin size={36} color="#D5A34E" />
                <strong>Map location</strong>
                <p style={{ margin: 0 }}>{siteConfig.address.oneLine}</p>
                <p style={{ margin: 0, fontSize: "0.8rem" }}>
                  The interactive map has not been configured yet.
                </p>
                <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-navy">
                  View on OpenStreetMap
                </a>
              </div>
            )}
          </div>

          {/* Enquiry form */}
          <form className="form-box" onSubmit={sendViaWhatsApp} noValidate>
            <h3>Send Us a Message</h3>

            <div className="form-field">
              <label htmlFor="c-name">Name *</label>
              <input id="c-name" value={form.name} onChange={update("name")} placeholder="Your name" autoComplete="name" />
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>
            <div className="form-field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" type="email" value={form.email} onChange={update("email")} placeholder="Your email" autoComplete="email" />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
            <div className="form-field">
              <label htmlFor="c-phone">Phone</label>
              <input id="c-phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="Your phone number" autoComplete="tel" />
            </div>
            <div className="form-field">
              <label htmlFor="c-message">Message *</label>
              <textarea id="c-message" value={form.message} onChange={update("message")} placeholder="How can we help you?" />
              {errors.message && <div className="field-error">{errors.message}</div>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-whatsapp">
                <WhatsAppIcon size={18} />
                Send Message on WhatsApp
              </button>
              <button type="button" className="btn btn-navy" onClick={sendViaEmail}>
                <Mail size={16} />
                Send via Email
              </button>
            </div>
            <p className="form-note">
              This form is not connected to a server. Clicking a button opens WhatsApp or your email app with your message
              filled in. You press send there to deliver it.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
