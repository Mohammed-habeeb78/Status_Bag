import { useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { siteConfig } from "./config/siteConfig";

/** Shared layout: the same navbar, floating contact buttons and footer on all four pages. */
function Layout() {
  const { pathname } = useLocation();

  // Start each page at the top (the Products page handles its own #hash scrolling).
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.title = `${siteConfig.businessName} | Bag Manufacturer & Supplier`;
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
