import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../data/products";
import { siteConfig } from "../config/siteConfig";

const INTERVAL_MS = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Automatic rotation (pauses on hover/focus and when the user prefers reduced motion).
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.image}
          className={`hero-slide ${i === index ? "is-active" : ""}`}
          aria-hidden={i !== index}
        >
          <img src={slide.image} alt={slide.alt} loading={i === 0 ? "eager" : "lazy"} />
        </div>
      ))}
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-brand">{siteConfig.businessName}</div>
        <h1>
          Quality Bags
          <br />
          Built to Last
        </h1>
        <p className="hero-sub">Manufacturer &amp; Supplier of Premium Bags for Every Need.</p>
        <div className="hero-actions">
          <Link to="/products" className="btn btn-gold">
            Explore Our Products
          </Link>
          <Link to="/contact" className="btn btn-outline-light">
            Contact Us
          </Link>
        </div>
      </div>

      <button type="button" className="hero-arrow prev" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={22} />
      </button>
      <button type="button" className="hero-arrow next" onClick={next} aria-label="Next slide">
        <ChevronRight size={22} />
      </button>

      <div className="hero-dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  );
}
