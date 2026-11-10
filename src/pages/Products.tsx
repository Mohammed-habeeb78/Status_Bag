import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import { categories, productsInCategory } from "../data/products";
import type { Category } from "../data/products";

export default function Products() {
  const location = useLocation();
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll to the category named in the URL hash (e.g. /products#backpacks from Home).
  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
        setActiveId(id);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash]);

  // Highlight the category currently in view in the side navigation.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDownload = async (category: Category) => {
    setBusyId(category.id);
    setErrors((e) => ({ ...e, [category.id]: null }));
    try {
      // Loaded on demand so the PDF library only downloads when a catalogue is requested.
      const { downloadCategoryPdf } = await import("../utils/catalogPdf");
      await downloadCategoryPdf(category, productsInCategory(category.id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "The PDF could not be generated. Please try again.";
      setErrors((e) => ({ ...e, [category.id]: message }));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Our Products</h1>
          <p>Explore our wide range of premium quality bags. Download a PDF catalogue for any category below.</p>
        </div>
      </header>

      <div className="container catalogue">
        <aside className="side-nav" aria-label="Product categories">
          <h4>Categories</h4>
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={activeId === c.id ? "active" : ""}>
              {c.name}
            </a>
          ))}
        </aside>

        <div>
          {categories.map((c) => {
            const items = productsInCategory(c.id);
            const hasProducts = items.length > 0;
            return (
              <section
                key={c.id}
                id={c.id}
                className="cat-section"
                ref={(el) => {
                  sectionRefs.current[c.id] = el;
                }}
              >
                <div className="cat-head">
                  <div>
                    <h2>{c.name}</h2>
                    <p>{c.description}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-navy"
                    onClick={() => handleDownload(c)}
                    disabled={!hasProducts || busyId === c.id}
                    title={hasProducts ? `Download the ${c.name} PDF catalogue` : "No products in this category yet"}
                  >
                    <Download size={16} />
                    {busyId === c.id ? "Preparing…" : "Download PDF"}
                  </button>
                </div>

                {errors[c.id] && <p className="pdf-error">{errors[c.id]}</p>}

                {hasProducts ? (
                  <div className="product-grid">
                    {items.map((p) => (
                      <article key={p.id} className="product-card">
                        <img src={p.image} alt={p.name} loading="lazy" />
                        <div className="pc-body">
                          <h3>{p.name}</h3>
                          <p>{p.description}</p>
                          <ul className="specs">
                            {p.specs.map((s) => (
                              <li key={s.label}>
                                <span>{s.label}</span>
                                <span>{s.value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="cat-empty">No products have been added to this category yet.</p>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
