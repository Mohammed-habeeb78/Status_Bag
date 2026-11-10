import { Link } from "react-router-dom";
import { ShieldCheck, Users, Handshake, TrendingUp } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

const icons = [ShieldCheck, Users, Handshake, TrendingUp];

export default function About() {
  const about = siteConfig.aboutUs;

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>{siteConfig.businessName}: manufacturing and supplying bags for everyday needs.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="about-split">
            <img
              className="about-hero-img"
              src="/assets/about/facility.svg"
              alt="STATUS BAG INDUSTRIES facility (placeholder image)"
            />
            <div>
              <h3>Who We Are</h3>
              {about.whoWeAre.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </div>

          <div className="about-block" style={{ marginTop: 56 }}>
            <h3>About Our Business</h3>
            {about.aboutOurBusiness.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>

          <div className="about-block">
            <h3>Our Dedication</h3>
            <ul className="dedication-list">
              {about.dedication.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ textAlign: "center", borderLeft: "none", paddingLeft: 0 }}>Why Choose Us</h3>
            <div className="why-grid">
              {about.whyChooseUs.map((w, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <div key={w.title} className="why-card">
                    <div className="why-icon">
                      <Icon size={26} />
                    </div>
                    <h4>{w.title}</h4>
                    <p>{w.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/products" className="btn btn-navy">
              View Our Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
