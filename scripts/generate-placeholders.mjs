// Generates TEMPORARY placeholder SVG artwork for the website.
// Replace every file in public/assets/* with real photographs/logo when the client supplies them.
// Run with: node scripts/generate-placeholders.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets");

const NAVY = "#071A2B";
const NAVY2 = "#142B45";
const GOLD = "#D5A34E";

// Simple bag silhouettes drawn in a 400x300 box. Returns SVG inner markup.
function bag(kind, c, dark, accent) {
  switch (kind) {
    case "backpack":
      return `
        <path d="M170 92 Q200 48 230 92" fill="none" stroke="${dark}" stroke-width="10" stroke-linecap="round"/>
        <rect x="132" y="82" width="136" height="180" rx="44" fill="url(#g-${c.slice(1)})"/>
        <rect x="150" y="164" width="100" height="76" rx="14" fill="${dark}" opacity=".35"/>
        <line x1="150" y1="176" x2="250" y2="176" stroke="${dark}" stroke-width="3" opacity=".5"/>
        <rect x="186" y="108" width="28" height="10" rx="4" fill="${accent}"/>`;
    case "school":
      return `
        <path d="M172 84 Q200 42 228 84" fill="none" stroke="${dark}" stroke-width="9" stroke-linecap="round"/>
        <rect x="138" y="70" width="124" height="200" rx="40" fill="url(#g-${c.slice(1)})"/>
        <rect x="138" y="128" width="124" height="16" fill="${accent}"/>
        <rect x="150" y="186" width="100" height="62" rx="12" fill="${dark}" opacity=".3"/>
        <path d="M150 190 L150 240 M250 190 L250 240" stroke="${dark}" stroke-width="3" opacity=".3"/>`;
    case "laptop":
      return `
        <path d="M168 112 L168 92 Q200 68 232 92 L232 112" fill="none" stroke="${dark}" stroke-width="9" stroke-linejoin="round"/>
        <rect x="84" y="110" width="232" height="136" rx="12" fill="url(#g-${c.slice(1)})"/>
        <path d="M84 150 L316 150" stroke="${dark}" stroke-width="3" opacity=".5"/>
        <rect x="186" y="138" width="28" height="22" rx="4" fill="${accent}"/>
        <rect x="108" y="200" width="184" height="30" rx="6" fill="${dark}" opacity=".18"/>`;
    case "trolley":
      return `
        <line x1="256" y1="92" x2="256" y2="36" stroke="${dark}" stroke-width="7" stroke-linecap="round"/>
        <path d="M256 36 L276 36" stroke="${dark}" stroke-width="7" stroke-linecap="round"/>
        <rect x="112" y="74" width="176" height="176" rx="16" fill="url(#g-${c.slice(1)})"/>
        <line x1="112" y1="120" x2="288" y2="120" stroke="${dark}" stroke-width="3" opacity=".4"/>
        <rect x="150" y="136" width="100" height="36" rx="6" fill="${dark}" opacity=".25"/>
        <circle cx="146" cy="256" r="12" fill="${dark}"/>
        <circle cx="254" cy="256" r="12" fill="${dark}"/>`;
    case "duffle":
      return `
        <path d="M158 110 Q200 70 242 110" fill="none" stroke="${dark}" stroke-width="9" stroke-linecap="round"/>
        <rect x="64" y="110" width="272" height="124" rx="60" fill="url(#g-${c.slice(1)})"/>
        <rect x="186" y="110" width="28" height="124" fill="${dark}" opacity=".2"/>
        <rect x="174" y="104" width="52" height="14" rx="6" fill="${accent}"/>
        <rect x="112" y="150" width="176" height="6" fill="${dark}" opacity=".35"/>`;
    case "messenger":
      return `
        <path d="M100 100 L300 240" stroke="${dark}" stroke-width="10" stroke-linecap="round" opacity=".85"/>
        <rect x="104" y="110" width="192" height="142" rx="10" fill="url(#g-${c.slice(1)})"/>
        <path d="M104 110 L200 180 L296 110 Z" fill="${dark}" opacity=".3"/>
        <rect x="186" y="170" width="28" height="18" rx="4" fill="${accent}"/>`;
    case "sling":
      return `
        <path d="M118 100 Q220 40 300 170" fill="none" stroke="${dark}" stroke-width="11" stroke-linecap="round"/>
        <rect x="150" y="128" width="136" height="104" rx="46" fill="url(#g-${c.slice(1)})"/>
        <path d="M160 150 L276 150" stroke="${dark}" stroke-width="3" opacity=".4"/>
        <rect x="200" y="166" width="26" height="14" rx="4" fill="${accent}"/>`;
    case "tote":
      return `
        <path d="M150 112 Q150 60 200 60 Q250 60 250 112" fill="none" stroke="${dark}" stroke-width="8"/>
        <path d="M110 110 L290 110 L300 248 L100 248 Z" fill="url(#g-${c.slice(1)})" stroke-linejoin="round"/>
        <rect x="150" y="150" width="100" height="46" rx="4" fill="${dark}" opacity=".2"/>
        <rect x="186" y="130" width="28" height="10" rx="3" fill="${accent}"/>`;
    case "pouch":
      return `
        <rect x="120" y="120" width="160" height="104" rx="14" fill="url(#g-${c.slice(1)})"/>
        <line x1="124" y1="150" x2="276" y2="150" stroke="${dark}" stroke-width="4" stroke-linecap="round" opacity=".6"/>
        <rect x="236" y="152" width="22" height="30" rx="5" fill="${accent}"/>
        <rect x="150" y="176" width="100" height="30" rx="6" fill="${dark}" opacity=".15"/>`;
    default:
      throw new Error("unknown kind " + kind);
  }
}

// Stand-alone product/category image (400x300, light background, PLACEHOLDER label).
function productSvg(id, kind, color, accent) {
  const dark = shade(color, -45);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bgp-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#F6F5F1"/>
    </linearGradient>
    <linearGradient id="g-${color.slice(1)}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${color}"/><stop offset="1" stop-color="${dark}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgp-${id})"/>
  <ellipse cx="200" cy="262" rx="120" ry="10" fill="#000" opacity=".08"/>
  ${bag(kind, color, dark, accent)}
  <text x="200" y="292" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#8A8F96" letter-spacing="2">PLACEHOLDER IMAGE</text>
</svg>
`;
}

// Hero scene: several bags on a navy background.
function heroSvg(id, items) {
  const groups = items
    .map(
      ([kind, color, accent, x, y, s]) =>
        `<g transform="translate(${x} ${y}) scale(${s})">${bag(kind, color, shade(color, -45), accent)}</g>`
    )
    .join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="hbg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY2}"/><stop offset="1" stop-color="${NAVY}"/>
    </linearGradient>
    ${items
      .map(
        ([, color]) =>
          `<linearGradient id="g-${color.slice(1)}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${color}"/><stop offset="1" stop-color="${shade(color, -45)}"/></linearGradient>`
      )
      .join("")}
  </defs>
  <rect width="1200" height="600" fill="url(#hbg-${id})"/>
  <ellipse cx="600" cy="520" rx="420" ry="22" fill="#000" opacity=".3"/>
  ${groups}
  <text x="1170" y="585" font-family="Arial, sans-serif" font-size="14" text-anchor="end" fill="#D5A34E" opacity=".8" letter-spacing="3">PLACEHOLDER HERO IMAGE</text>
</svg>
`;
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amt);
  const g = clamp(((n >> 8) & 0xff) + amt);
  const b = clamp((n & 0xff) + amt);
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

// ---- Logo (temporary text logo with bag icon) ----
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 64">
  <g transform="translate(2 6)">
    <path d="M14 14 Q20 2 26 14" fill="none" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>
    <rect x="2" y="12" width="36" height="34" rx="8" fill="${GOLD}"/>
    <rect x="8" y="26" width="24" height="8" rx="2" fill="${NAVY}" opacity=".35"/>
  </g>
  <text x="50" y="30" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" letter-spacing="1">STATUS BAG</text>
  <text x="50" y="48" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="600" fill="${GOLD}" letter-spacing="5">INDUSTRIES</text>
</svg>
`;

// Facility / about placeholder (building illustration)
const facility = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DDE6EE"/><stop offset="1" stop-color="#F6F5F1"/></linearGradient>
  </defs>
  <rect width="800" height="560" fill="url(#sky)"/>
  <rect y="430" width="800" height="130" fill="#C9D3C4"/>
  <rect x="120" y="230" width="560" height="200" fill="#8FA3B8"/>
  <rect x="120" y="230" width="560" height="14" fill="#5C7189"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7]
    .map((i) => `<rect x="${150 + i * 66}" y="270" width="40" height="60" fill="#E9F0F6" opacity=".9"/>`)
    .join("")}
  ${[0, 1, 2, 3, 4, 5, 6, 7]
    .map((i) => `<rect x="${150 + i * 66}" y="350" width="40" height="60" fill="#E9F0F6" opacity=".9"/>`)
    .join("")}
  <rect x="360" y="366" width="80" height="64" fill="#142B45"/>
  <circle cx="110" cy="410" r="36" fill="#5E8C5A"/><circle cx="700" cy="410" r="36" fill="#5E8C5A"/>
  <rect x="106" y="430" width="8" height="40" fill="#6B5A44"/><rect x="696" y="430" width="8" height="40" fill="#6B5A44"/>
  <text x="400" y="200" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">STATUS BAG INDUSTRIES</text>
  <text x="400" y="530" font-family="Arial, sans-serif" font-size="14" fill="#20252B" text-anchor="middle" letter-spacing="3">PLACEHOLDER — REPLACE WITH FACILITY PHOTO</text>
</svg>
`;

const products = [
  ["urban-backpack", "backpack", "#3B4A5C", GOLD],
  ["executive-backpack", "backpack", "#2A2F36", "#8C6A3F"],
  ["trekker-backpack", "backpack", "#5B6B4E", GOLD],
  ["slim-laptop-bag", "laptop", "#1F2A38", GOLD],
  ["briefcase-laptop-bag", "laptop", "#6B4A32", GOLD],
  ["junior-school-bag", "school", "#2E5C8A", GOLD],
  ["senior-school-bag", "school", "#3A3F47", "#C24B4B"],
  ["cabin-trolley", "trolley", "#1F2A38", GOLD],
  ["weekender-travel-bag", "duffle", "#7A5136", GOLD],
  ["classic-duffle", "duffle", "#2A2F36", GOLD],
  ["gym-duffle", "duffle", "#24405E", "#C24B4B"],
  ["messenger-office-bag", "messenger", "#3A3F47", GOLD],
  ["document-bag", "laptop", "#5A3D2B", GOLD],
  ["crossbody-sling", "sling", "#6B4A32", GOLD],
  ["chest-sling", "sling", "#2A2F36", "#8C6A3F"],
  ["tote-bag", "tote", "#D8CBB0", GOLD],
  ["utility-pouch", "pouch", "#4A5A3F", GOLD],
];

// One representative image per category (used on Home cards and Products headers).
const categories = [
  ["backpacks", "backpack", "#2A2F36", GOLD],
  ["laptop-bags", "laptop", "#1F2A38", GOLD],
  ["school-bags", "school", "#2E5C8A", GOLD],
  ["travel-bags", "trolley", "#7A5136", GOLD],
  ["duffle-bags", "duffle", "#2A2F36", GOLD],
  ["office-bags", "messenger", "#3A3F47", GOLD],
  ["sling-bags", "sling", "#6B4A32", GOLD],
  ["other-products", "tote", "#D8CBB0", GOLD],
];

const write = (rel, content) => {
  const full = join(root, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log("wrote", rel);
};

write("branding/logo.svg", logo);
write("about/facility.svg", facility);

write("hero/slide-1.svg", heroSvg("1", [
  ["duffle", "#5C7896", GOLD, 120, 230, 1.25],
  ["backpack", "#3B4A5C", GOLD, 420, 120, 1.05],
  ["laptop", "#6B4A32", GOLD, 700, 290, 0.9],
]));
write("hero/slide-2.svg", heroSvg("2", [
  ["backpack", "#8A94A3", GOLD, 180, 110, 1.15],
  ["trolley", "#7A5136", GOLD, 520, 150, 1.05],
  ["school", "#2E5C8A", GOLD, 860, 190, 0.85],
]));
write("hero/slide-3.svg", heroSvg("3", [
  ["messenger", "#9A8B6E", GOLD, 150, 150, 1.1],
  ["sling", "#6B4A32", GOLD, 480, 230, 1.0],
  ["tote", "#D8CBB0", GOLD, 800, 110, 1.05],
]));

for (const [slug, kind, color, accent] of products) {
  write(`products/${slug}.svg`, productSvg(slug, kind, color, accent));
}
for (const [slug, kind, color, accent] of categories) {
  write(`categories/${slug}.svg`, productSvg("cat-" + slug, kind, color, accent));
}
