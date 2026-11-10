import { jsPDF } from "jspdf";
import type { Category, Product } from "../data/products";
import { siteConfig } from "../config/siteConfig";

/*
 * Client-side, free PDF generation with jsPDF (no paid APIs, no server).
 * Each category produces its own multi-page A4 catalogue containing the
 * category's products, their photographs, names, descriptions, specs,
 * the company logo, branding and contact details.
 */

const NAVY: [number, number, number] = [7, 26, 43];
const GOLD: [number, number, number] = [213, 163, 78];
const DARK: [number, number, number] = [32, 37, 43];
const MUTED: [number, number, number] = [93, 102, 112];
const BORDER: [number, number, number] = [228, 225, 216];

const PAGE_W = 210;
const MARGIN = 14;
const HEADER_H = 30;
const FOOTER_LINE_Y = 278;
const COL_GAP = 8;
const COL_W = (PAGE_W - MARGIN * 2 - COL_GAP) / 2;
const IMG_H = COL_W * 0.75; // matches the 4:3 product images
const CONTENT_TOP = HEADER_H + 12;
const CONTENT_BOTTOM = FOOTER_LINE_Y - 6;

/**
 * Rasterise an image in /public (SVG or raster) into a JPEG data URL for jsPDF.
 * JPEG is used because jsPDF embeds PNGs uncompressed, which makes files huge.
 * `background` is painted first so transparent logos sit on the colour they were designed for.
 */
const imageCache = new Map<string, Promise<string | null>>();
function toImageDataUrl(
  src: string,
  width: number,
  height: number,
  background: string
): Promise<string | null> {
  const key = `${src}|${width}x${height}|${background}`;
  const cached = imageCache.get(key);
  if (cached) return cached;

  const promise = new Promise<string | null>((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
  imageCache.set(key, promise);
  return promise;
}

/** File name in the form STATUS-BACKPACKS-CATALOGUE.pdf */
export function catalogueFileName(category: Category): string {
  const slug = category.name.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `STATUS-${slug}-CATALOGUE.pdf`;
}

export async function downloadCategoryPdf(category: Category, items: Product[]): Promise<void> {
  if (items.length === 0) {
    throw new Error("This category has no products yet.");
  }

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  const [logo, productImages] = await Promise.all([
    toImageDataUrl(siteConfig.logoPath, 1080, 256, "#071A2B"),
    Promise.all(items.map((p) => toImageDataUrl(p.image, 900, 675, "#FFFFFF"))),
  ]);

  const drawChrome = () => {
    // Header band
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, PAGE_W, HEADER_H, "F");
    doc.setFillColor(...GOLD);
    doc.rect(0, HEADER_H, PAGE_W, 1.2, "F");

    if (logo) {
      const logoW = 58;
      doc.addImage(logo, "JPEG", MARGIN, (HEADER_H - logoW * (256 / 1080)) / 2, logoW, logoW * (256 / 1080));
    } else {
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(siteConfig.businessName, MARGIN, 17);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(...GOLD);
    doc.text(category.name.toUpperCase(), PAGE_W - MARGIN, 14, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("PRODUCT CATALOGUE", PAGE_W - MARGIN, 21, { align: "right" });

    // Footer with contact details
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, FOOTER_LINE_Y, PAGE_W - MARGIN, FOOTER_LINE_Y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...DARK);
    doc.text(
      `Phone: ${siteConfig.phoneDisplay}   |   WhatsApp: +${siteConfig.whatsappNumber}   |   Email: ${siteConfig.email}`,
      MARGIN,
      FOOTER_LINE_Y + 5
    );
    doc.setTextColor(...MUTED);
    doc.text(siteConfig.address.oneLine, MARGIN, FOOTER_LINE_Y + 9.5);
  };

  const specHeight = (p: Product) => p.specs.length * 4.6;

  const measureCell = (p: Product): number => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const nameLines = doc.splitTextToSize(p.name, COL_W - 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const descLines = doc.splitTextToSize(p.description, COL_W - 4);
    return IMG_H + 3 + nameLines.length * 4.6 + descLines.length * 4 + 3 + specHeight(p) + 4;
  };

  const drawCell = (p: Product, img: string | null, x: number, y: number, h: number) => {
    doc.setDrawColor(...BORDER);
    doc.rect(x, y, COL_W, h);
    if (img) {
      doc.addImage(img, "JPEG", x, y, COL_W, IMG_H);
    } else {
      doc.setFillColor(246, 245, 241);
      doc.rect(x, y, COL_W, IMG_H, "F");
    }
    let ty = y + IMG_H + 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...NAVY);
    const nameLines = doc.splitTextToSize(p.name, COL_W - 4);
    doc.text(nameLines, x + 2, ty);
    ty += nameLines.length * 4.6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    const descLines = doc.splitTextToSize(p.description, COL_W - 4);
    doc.text(descLines, x + 2, ty);
    ty += descLines.length * 4 + 3;

    doc.setFontSize(8);
    doc.setTextColor(...DARK);
    for (const s of p.specs) {
      doc.text(`${s.label}: ${s.value}`, x + 2, ty);
      ty += 4.6;
    }
  };

  // ---- First page: category title and description ----
  drawChrome();
  let y = CONTENT_TOP;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...NAVY);
  doc.text(category.name, MARGIN, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const intro = doc.splitTextToSize(category.description, PAGE_W - MARGIN * 2);
  doc.text(intro, MARGIN, y);
  y += intro.length * 5 + 6;

  // ---- Product grid (two columns, multi-page) ----
  for (let i = 0; i < items.length; i += 2) {
    const left = items[i];
    const right = items[i + 1];
    const leftH = measureCell(left);
    const rightH = right ? measureCell(right) : 0;
    const rowH = Math.max(leftH, rightH);

    if (y + rowH > CONTENT_BOTTOM) {
      doc.addPage();
      drawChrome();
      y = CONTENT_TOP;
    }

    drawCell(left, productImages[i], MARGIN, y, rowH);
    if (right) {
      drawCell(right, productImages[i + 1], MARGIN + COL_W + COL_GAP, y, rowH);
    }
    y += rowH + 6;
  }

  // ---- Page numbers ----
  const total = doc.getNumberOfPages();
  for (let n = 1; n <= total; n++) {
    doc.setPage(n);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(`Page ${n} of ${total}`, PAGE_W - MARGIN, FOOTER_LINE_Y + 5, { align: "right" });
  }

  doc.save(catalogueFileName(category));
}
