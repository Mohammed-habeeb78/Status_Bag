import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig, telLink, whatsappLink, mailLink, configuredSocials } from "../config/siteConfig";
import { WhatsAppIcon, InstagramIcon, FacebookIcon, LinkedInIcon, YouTubeIcon } from "./BrandIcons";

const socialIcon = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
} as const;

export default function Footer() {
  const socials = configuredSocials();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img src={siteConfig.logoPath} alt={siteConfig.businessName} />
            <p>{siteConfig.introShort}</p>
            {socials.length > 0 && (
              <div className="social-row" aria-label="Social media">
                {socials.map((s) => {
                  const Icon = socialIcon[s.key];
                  return (
                    <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Our Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <div className="f-row"><Phone size={16} /><a href={telLink}>{siteConfig.phoneDisplay}</a></div>
            <div className="f-row"><WhatsAppIcon size={16} /><a href={whatsappLink(siteConfig.whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
            <div className="f-row"><Mail size={16} /><a href={mailLink()}>{siteConfig.email}</a></div>
          </div>

          <div>
            <h4>Address</h4>
            <div className="f-row">
              <MapPin size={16} />
              <span>{siteConfig.address.lines.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {year} {siteConfig.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
