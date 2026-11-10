import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import { categories } from "../data/products";
import { siteConfig } from "../config/siteConfig";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <section className="section" style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <h2 className="section-title">Our Product Categories</h2>
          <p className="section-sub">Explore our range of high quality bags.</p>
          <div className="category-grid">
            {categories.map((c) => (
              <Link key={c.id} to={`/products#${c.id}`} className="category-card">
                <img src={c.image} alt={`${c.name} category`} loading="lazy" />
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="intro-band">
        <div className="container intro-grid">
          <div>
            <h2>
              Welcome to <span>{siteConfig.businessName}</span>
            </h2>
            <p>{siteConfig.introShort}</p>
            <p>
              We are committed to delivering durable, stylish and functional bags crafted with care and quality
              workmanship.
            </p>
            <Link to="/about" className="btn btn-gold" style={{ marginTop: 10 }}>
              About Us
            </Link>
          </div>
          <img src="/assets/about/facility.svg" alt="STATUS BAG INDUSTRIES facility (placeholder image)" loading="lazy" />
        </div>
      </section>
    </>
  );
}
