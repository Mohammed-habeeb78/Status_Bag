/**
 * ===========================================================================
 * SITE CONFIGURATION — edit ALL business details here.
 * ===========================================================================
 * Every phone number, email, address, social link and About Us text used on
 * the website comes from this file. Nothing else needs to change for normal
 * content updates.
 *
 * IMPORTANT:
 *  - Values marked "PLACEHOLDER" are temporary and must be replaced with the
 *    client's verified details before going live.
 *  - Leave a social link as "" (empty) to HIDE that icon everywhere.
 *  - Phone numbers: use international format, digits only for WhatsApp
 *    (e.g. "919876543210" — no "+", spaces or dashes).
 */

export const siteConfig = {
  /** Business name shown in the logo, footer, PDFs and page titles. */
  businessName: "STATUS BAG INDUSTRIES",

  /** Logo file in /public. Replace the file with the official logo (SVG or PNG). */
  logoPath: "/assets/branding/logo.svg",

  /** Display phone number (shown on the site). PLACEHOLDER */
  phoneDisplay: "+91 98765 67676",
  /** Phone for tel: links — international format, no spaces. PLACEHOLDER */
  phoneTel: "+919876543210",

  /** WhatsApp number for wa.me links — digits only, country code first. PLACEHOLDER */
  whatsappNumber: "9848344350",
  /** Text pre-filled when a visitor opens WhatsApp from a floating button. */
  whatsappDefaultMessage: "Hello STATUS BAG INDUSTRIES, I would like to know more about your bags.",

  /** Business email. PLACEHOLDER */
  email: "info@statusbag.com",

  /** Full business address (multi-line, use \n for line breaks). PLACEHOLDER */
  address: {
    lines: [
      "STATUS BAG INDUSTRIES",
      "123, Industrial Area",
      "Your City - 395001",
      "India",
    ],
    /** One-line version used in the footer and map search. */
    oneLine: "STATUS BAG INDUSTRIES, 123, Industrial Area, Your City - 395001, India",
  },

  /**
   * Google Maps embed URL (Share → Embed a map → copy the src="..." URL).
   * Free, no API key needed. Leave "" to show the location placeholder.
   * Example: "https://www.google.com/maps/embed?pb=..."
   */
  mapEmbedUrl: "",

  /** Social media. Leave "" to hide. Only configured accounts are displayed. */
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  /** Short company introduction — used on Home and in the footer. PLACEHOLDER wording. */
  introShort:
    "STATUS BAG INDUSTRIES manufactures and supplies bags for everyday use, school, work and travel.",

  /** About Us page content. Do NOT add history, certifications, years or numbers unless verified. */
  aboutUs: {
    whoWeAre: [
      "STATUS BAG INDUSTRIES is a bag manufacturer and supplier. [PLACEHOLDER — replace with the client's verified company introduction.]",
      "Our range covers backpacks, laptop bags, school bags, travel bags, duffle bags, office bags and more.",
    ],
    aboutOurBusiness: [
      "We design and supply bags across several categories so that customers can find a suitable product for daily commuting, school, office work, travel and sport. [PLACEHOLDER — replace with verified details about manufacturing and supply.]",
    ],
    dedication: [
      "Quality — we aim to use dependable materials and careful workmanship. [PLACEHOLDER — confirm the client's quality commitments.]",
      "Product design — we focus on practical, comfortable and well-finished designs.",
      "Customer satisfaction — we value clear communication and reliable service.",
      "Reliability — we aim to deliver consistent products every time.",
      "Continuous improvement — we review our products and processes to keep improving.",
    ],
    whyChooseUs: [
      { title: "Quality Materials", text: "Dependable materials chosen for durability. [PLACEHOLDER detail]" },
      { title: "Skilled Workforce", text: "A team focused on precise and careful stitching and finishing. [PLACEHOLDER detail]" },
      { title: "Customer Focus", text: "Clear communication and a genuine interest in what customers need." },
      { title: "Continuous Improvement", text: "Ongoing review of designs and processes to keep raising standards." },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Helper: build a wa.me click-to-chat link with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Helper: tel: link. */
export const telLink = `tel:${siteConfig.phoneTel}`;

/** Helper: mailto: link with optional subject/body. */
export function mailLink(subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${siteConfig.email}${params.length ? "?" + params.join("&") : ""}`;
}

/** Only social platforms that have a configured URL. */
export function configuredSocials(): { key: keyof SiteConfig["social"]; url: string; label: string }[] {
  const labels: Record<keyof SiteConfig["social"], string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    youtube: "YouTube",
  };
  return (Object.keys(siteConfig.social) as (keyof SiteConfig["social"])[])
    .filter((k) => siteConfig.social[k].trim() !== "")
    .map((k) => ({ key: k, url: siteConfig.social[k], label: labels[k] }));
}
