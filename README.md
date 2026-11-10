# STATUS BAG INDUSTRIES — Corporate Website

A four-page corporate product showcase website built with React, Vite, TypeScript and React Router.

**Pages:** Home · Our Products · About Us · Contact Us

It is not an e-commerce site. There is no ordering, cart, checkout, payments, accounts or backend.

---

## 1. Run and build

Requirements: Node.js 18 or newer.

```bash
npm install          # install dependencies (first time only)
npm run dev          # start the development server (http://localhost:5173)
npm run build        # type-check and create a production build in /dist
npm run preview      # serve the production build locally (http://localhost:4173)
```

Deploy the contents of `dist/` to any free static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or a plain web server). Because the site uses React Router, configure the host to serve `index.html` for unknown paths so that direct links such as `/products` work.

---

## 2. Where things are

| What to change | File |
|---|---|
| Phone, WhatsApp, email, address, map embed, social links, About Us text | `src/config/siteConfig.ts` |
| Product categories and products (names, descriptions, specs, image paths) | `src/data/products.ts` |
| Hero carousel slides | `src/data/products.ts` (`heroSlides`) and the images in `public/assets/hero/` |
| Logo | `public/assets/branding/logo.svg` (path set in `siteConfig.logoPath`) |
| Colours, spacing, responsive rules | `src/styles.css` (colours are CSS variables at the top) |
| Navbar | `src/components/Navbar.tsx` |
| Footer | `src/components/Footer.tsx` |
| Floating WhatsApp and call buttons | `src/components/FloatingContact.tsx` |
| Category PDF generation | `src/utils/catalogPdf.ts` |
| Placeholder artwork generator | `scripts/generate-placeholders.mjs` |

### Image folders

```
public/assets/
  branding/   logo.svg
  hero/       slide-1.svg, slide-2.svg, slide-3.svg
  products/   one image per product (named after the product id)
  categories/ one image per category (backpacks.svg, laptop-bags.svg, ...)
  about/      facility.svg
```

All current images are temporary placeholders. Replace them with real photos. You can keep the same file names, or change the paths in the data files. See `CLIENT_ASSET_CHECKLIST.md` for the full list of client assets.

To regenerate the placeholder artwork at any time:

```bash
node scripts/generate-placeholders.mjs
```

This overwrites the files in `public/assets/`, so do it only before you add real photos.

---

## 3. Phone and WhatsApp numbers

Edit `src/config/siteConfig.ts`:

```ts
phoneDisplay: "+91 98765 43210",   // shown on the site
phoneTel: "+919876543210",         // used by tel: links (international format, no spaces)
whatsappNumber: "919876543210",    // used by wa.me links (digits only, country code first)
```

These values feed the navbar call button, the floating call and WhatsApp buttons, the footer, the contact page and the PDF footers.

---

## 4. Social media links and address

In `src/config/siteConfig.ts`:

```ts
address: { lines: [...], oneLine: "..." },
mapEmbedUrl: "",                    // paste the Google Maps "Embed a map" src URL here
social: {
  instagram: "https://instagram.com/yourpage",
  facebook: "",                     // empty = hidden
  linkedin: "",
  youtube: "",
},
```

Only social accounts with a URL are shown. Empty values are hidden on every page.

For the map, use Google Maps → Share → Embed a map and copy the `src` URL. This is free and needs no API key. If `mapEmbedUrl` is empty, the contact page shows the address with an OpenStreetMap link instead.

---

## 5. How the category PDF downloads work

- Each category on **Our Products** has a **Download PDF** button.
- When clicked, the browser builds a multi-page A4 PDF for that category only, using [jsPDF](https://github.com/parallax/jsPDF) (free and open source). Nothing is sent to a server.
- Each PDF contains the STATUS BAG logo, the category name and description, every product in that category (photo, name, description, specs), and the contact details in the footer. Pages are numbered.
- File names follow the pattern `STATUS-BACKPACKS-CATALOGUE.pdf`, `STATUS-LAPTOP-BAGS-CATALOGUE.pdf`, and so on.
- The PDF uses the same data as the website, so editing `src/data/products.ts` or the images updates both automatically.
- If a category has no products, its button is disabled and a message is shown.
- The PDF library is loaded only when a download is requested, which keeps the first page load fast.

---

## 6. Contact form

The form does not submit to a server, because none is configured. The **Send Message on WhatsApp** button opens WhatsApp with the enquiry pre-filled, and **Send via Email** opens the visitor's email app. The visitor presses send in either app. If a real form backend is added later, replace the handlers in `src/pages/Contact.tsx`.

---

## 7. Project structure

```
src/
  config/siteConfig.ts        all business details (edit here)
  data/products.ts            categories, products and hero slides (edit here)
  components/                 Navbar, Footer, HeroCarousel, FloatingContact, BrandIcons
  pages/                      Home, Products, About, Contact
  utils/catalogPdf.ts         client-side PDF generation
  styles.css                  all styling and responsive rules
  App.tsx                     routes and shared layout
  main.tsx                    entry point
public/assets/                images and logo (replaceable)
scripts/generate-placeholders.mjs   placeholder artwork generator
CLIENT_ASSET_CHECKLIST.md     what the client still needs to provide
```

---

## 8. Dependencies

| Package | Purpose |
|---|---|
| `react`, `react-dom` | UI |
| `react-router-dom` | Page navigation |
| `lucide-react` | Icons |
| `jspdf` | Free client-side PDF generation |

Brand icons (WhatsApp, Instagram, Facebook, LinkedIn, YouTube) are small inline SVGs in `src/components/BrandIcons.tsx`, because current versions of lucide-react no longer include brand icons.
