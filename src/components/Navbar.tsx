import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig, telLink } from "../config/siteConfig";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Our Products" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label={`${siteConfig.businessName} home`}>
          <img src={siteConfig.logoPath} alt={siteConfig.businessName} />
        </Link>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/contact" className="nav-cta">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>

        <a href={telLink} className="phone-circle" aria-label={`Call ${siteConfig.phoneDisplay}`}>
          <Phone size={18} />
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <ul>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
