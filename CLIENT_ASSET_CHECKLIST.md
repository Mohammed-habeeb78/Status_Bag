# STATUS BAG INDUSTRIES — Client Asset Checklist

The website is built and working, but several items are **temporary placeholders**. Please supply the items below so they can be replaced before the site goes live.

> Nothing in the site claims a company history, certification, years of experience, customer numbers, or production capacity. Those were intentionally left out. Only add them if they are verified.

---

## 1. Business details (required)

All of these are edited in **`src/config/siteConfig.ts`**.

| Item | Current value | Status |
|---|---|---|
| Phone number (display) | `+91 98765 43210` | PLACEHOLDER — please confirm |
| Phone number (tel: link) | `+919876543210` | PLACEHOLDER — please confirm |
| WhatsApp number (digits only) | `919876543210` | PLACEHOLDER — please confirm |
| Email address | `info@statusbag.com` | PLACEHOLDER — please confirm |
| Full postal address | `123, Industrial Area, Your City - 395001, India` | PLACEHOLDER — please provide the real address |
| Google Maps embed URL | *(empty — map shows a placeholder)* | Please provide (see section 4) |
| Instagram URL | *(empty — hidden)* | Provide only if the account exists |
| Facebook URL | *(empty — hidden)* | Provide only if the account exists |
| LinkedIn URL | *(empty — hidden)* | Provide only if the account exists |
| YouTube URL | *(empty — hidden)* | Provide only if the account exists |
| Company introduction (short) | Generic placeholder wording | Please provide approved wording |
| About Us text (who we are, business, dedication) | Generic placeholder wording | Please provide approved wording |
| "Why choose us" points | Generic placeholder wording | Please confirm or rewrite |

Social links are shown **only** when a URL is entered. Leaving a field empty hides that icon everywhere.

---

## 2. Logo (required)

- **Current file:** `public/assets/branding/logo.svg` (a temporary text logo with a bag icon)
- **Provide:** the official logo as an SVG (preferred) or a high-resolution PNG with a transparent background.
- **Replace:** put the file at `public/assets/branding/logo.svg`, or change `logoPath` in `src/config/siteConfig.ts`.
- **Also provide:** a square favicon if desired, to replace `public/favicon.svg`.
- Logo should work on a **dark navy** background (it appears in the navbar and footer) and should be legible at about 44 px height.

---

## 3. Photographs (required)

Every image currently on the site is a **generated placeholder illustration**, not a real photograph. Each file is labelled "PLACEHOLDER".

| Folder | What is needed | Recommended size |
|---|---|---|
| `public/assets/hero/` | 3 or more wide product photos for the home-page carousel (`slide-1`, `slide-2`, `slide-3`) | 1600 × 800 px, landscape, dark or neutral background |
| `public/assets/categories/` | One photo per category: `backpacks`, `laptop-bags`, `school-bags`, `travel-bags`, `duffle-bags`, `office-bags`, `sling-bags`, `other-products` | 800 × 600 px (4:3) |
| `public/assets/products/` | One photo per product (see section 5) | 1200 × 900 px (4:3), product on white or off-white background |
| `public/assets/about/` | One photo of the company premises, factory or team (`facility`) | 1600 × 900 px, landscape |

**Format:** JPG, PNG or WebP are fine. If you use a different extension, update the path in the relevant file (`src/data/products.ts` or `src/components/HeroCarousel.tsx` / `src/pages/Home.tsx` / `src/pages/About.tsx`).

**Photo guidelines:**
- Use the company's own photos or photos the company has the right to use.
- Do not use images from other brands or from unrelated search results.
- Keep product photos consistent in lighting, angle and background.

---

## 4. Google Maps embed URL (optional, recommended)

1. Open **Google Maps** and search for the business address.
2. Click **Share** → **Embed a map**.
3. Copy the `src="..."` URL from the iframe code.
4. Paste it into `mapEmbedUrl` in `src/config/siteConfig.ts`.

This is free and needs no API key. Until it is set, the contact page shows the address with an OpenStreetMap link.

---

## 5. Product information (required)

Products and categories are defined in **`src/data/products.ts`**.

For each product, please provide:
- [ ] Product name (current names are placeholders: Urban Backpack, Slim Laptop Bag, and so on)
- [ ] Category it belongs to
- [ ] Product photo (1200 × 900 px)
- [ ] Short description (current descriptions are generic and should be rewritten)
- [ ] Specifications: material, dimensions, capacity, colours, and so on (currently "To be confirmed")

**Current categories and sample products:**

| Category | Sample products (placeholders) |
|---|---|
| Backpacks | Urban Backpack, Executive Backpack, Trekker Backpack |
| Laptop Bags | Slim Laptop Bag, Briefcase Laptop Bag |
| School Bags | Junior School Bag, Senior School Bag |
| Travel Bags | Cabin Trolley, Weekender Travel Bag |
| Duffle Bags | Classic Duffle, Gym Duffle |
| Office Bags | Messenger Office Bag, Document Bag |
| Sling Bags | Crossbody Sling, Chest Sling |
| Other Products | Tote Bag, Utility Pouch |

Please also confirm whether any categories should be renamed, added or removed.

**Prices:** the website intentionally shows no prices. If prices are required in future, the catalogue structure can be extended.

---

## 6. Product catalogue PDFs

Each category has its own downloadable PDF, generated in the browser. The PDFs use the same product data, photos, logo and contact details as the website, so they update automatically when the site content changes. No action is needed from the client here, but the PDFs will reflect any placeholder text until it is replaced.

---

## 7. Contact form and enquiries

The contact form does **not** send messages to a server. It opens WhatsApp or the visitor's email app with the enquiry pre-filled.

Please confirm:
- [ ] The WhatsApp number that should receive enquiries.
- [ ] The email address that should receive enquiries.

If you would like form submissions to be stored or emailed automatically, a backend or form service will be needed. That is outside the current scope, which uses no paid services and no backend.

---

## 8. Final sign-off checklist

- [ ] Phone, WhatsApp and email confirmed in `siteConfig.ts`
- [ ] Address confirmed in `siteConfig.ts`
- [ ] Official logo supplied
- [ ] Hero photos supplied (3+)
- [ ] Category photos supplied (8)
- [ ] Product photos and details supplied
- [ ] Company photo supplied
- [ ] About Us text approved (no unverified claims)
- [ ] Map embed URL supplied (optional)
- [ ] Social media URLs supplied, or confirmed as not required
