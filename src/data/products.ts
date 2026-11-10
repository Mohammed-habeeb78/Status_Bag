/**
 * ===========================================================================
 * PRODUCT CATALOGUE — edit categories and products here.
 * ===========================================================================
 * - Each category has an `id` (used in URLs such as /products#backpacks).
 * - Each product belongs to one category through `categoryId`.
 * - Images live in /public/assets/products/<image>.svg — replace the file
 *   (keep the same name, or update `image` below).
 * - Specifications are placeholders until the client supplies real details.
 * - Prices are intentionally NOT included (the site shows no prices).
 */

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string; // path in /public
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  image: string; // path in /public
  specs: { label: string; value: string }[];
}

const PLACEHOLDER_SPECS = [
  { label: "Material", value: "To be confirmed" },
  { label: "Size", value: "To be confirmed" },
];

export const categories: Category[] = [
  {
    id: "backpacks",
    name: "Backpacks",
    description: "Everyday and travel backpacks designed for comfort, organisation and daily use.",
    image: "/assets/categories/backpacks.svg",
  },
  {
    id: "laptop-bags",
    name: "Laptop Bags",
    description: "Protective bags for laptops and work essentials, for commuting and office use.",
    image: "/assets/categories/laptop-bags.svg",
  },
  {
    id: "school-bags",
    name: "School Bags",
    description: "Durable school bags built for everyday wear, with practical compartments.",
    image: "/assets/categories/school-bags.svg",
  },
  {
    id: "travel-bags",
    name: "Travel Bags",
    description: "Trolley and weekender bags for trips, short stays and long journeys.",
    image: "/assets/categories/travel-bags.svg",
  },
  {
    id: "duffle-bags",
    name: "Duffle Bags",
    description: "Spacious duffle bags for travel, sport and everyday carrying.",
    image: "/assets/categories/duffle-bags.svg",
  },
  {
    id: "office-bags",
    name: "Office Bags",
    description: "Professional bags for documents, devices and daily office work.",
    image: "/assets/categories/office-bags.svg",
  },
  {
    id: "sling-bags",
    name: "Sling Bags",
    description: "Compact crossbody and sling bags for light, hands-free carrying.",
    image: "/assets/categories/sling-bags.svg",
  },
  {
    id: "other-products",
    name: "Other Products",
    description: "Totes, pouches and other bag products.",
    image: "/assets/categories/other-products.svg",
  },
];

export const products: Product[] = [
  // Backpacks
  { id: "urban-backpack", name: "Urban Backpack", categoryId: "backpacks", image: "/assets/products/urban-backpack.svg",
    description: "A clean everyday backpack with a main compartment and a front organiser pocket.", specs: PLACEHOLDER_SPECS },
  { id: "executive-backpack", name: "Executive Backpack", categoryId: "backpacks", image: "/assets/products/executive-backpack.svg",
    description: "A refined backpack suited to work and commuting.", specs: PLACEHOLDER_SPECS },
  { id: "trekker-backpack", name: "Trekker Backpack", categoryId: "backpacks", image: "/assets/products/trekker-backpack.svg",
    description: "A sturdy backpack for outdoor trips and daily carrying.", specs: PLACEHOLDER_SPECS },

  // Laptop Bags
  { id: "slim-laptop-bag", name: "Slim Laptop Bag", categoryId: "laptop-bags", image: "/assets/products/slim-laptop-bag.svg",
    description: "A slim, protective laptop bag for everyday commuting.", specs: PLACEHOLDER_SPECS },
  { id: "briefcase-laptop-bag", name: "Briefcase Laptop Bag", categoryId: "laptop-bags", image: "/assets/products/briefcase-laptop-bag.svg",
    description: "A structured briefcase-style bag with room for a laptop and papers.", specs: PLACEHOLDER_SPECS },

  // School Bags
  { id: "junior-school-bag", name: "Junior School Bag", categoryId: "school-bags", image: "/assets/products/junior-school-bag.svg",
    description: "A lightweight school bag designed for younger students.", specs: PLACEHOLDER_SPECS },
  { id: "senior-school-bag", name: "Senior School Bag", categoryId: "school-bags", image: "/assets/products/senior-school-bag.svg",
    description: "A roomier school bag for older students.", specs: PLACEHOLDER_SPECS },

  // Travel Bags
  { id: "cabin-trolley", name: "Cabin Trolley", categoryId: "travel-bags", image: "/assets/products/cabin-trolley.svg",
    description: "A wheeled trolley bag for travel with easy-roll wheels and a telescopic handle.", specs: PLACEHOLDER_SPECS },
  { id: "weekender-travel-bag", name: "Weekender Travel Bag", categoryId: "travel-bags", image: "/assets/products/weekender-travel-bag.svg",
    description: "A compact travel bag for short trips and weekend getaways.", specs: PLACEHOLDER_SPECS },

  // Duffle Bags
  { id: "classic-duffle", name: "Classic Duffle", categoryId: "duffle-bags", image: "/assets/products/classic-duffle.svg",
    description: "A classic duffle with a carry handle and shoulder strap.", specs: PLACEHOLDER_SPECS },
  { id: "gym-duffle", name: "Gym Duffle", categoryId: "duffle-bags", image: "/assets/products/gym-duffle.svg",
    description: "A practical duffle for sport and training, with a separate compartment.", specs: PLACEHOLDER_SPECS },

  // Office Bags
  { id: "messenger-office-bag", name: "Messenger Office Bag", categoryId: "office-bags", image: "/assets/products/messenger-office-bag.svg",
    description: "A crossbody messenger bag for documents and devices.", specs: PLACEHOLDER_SPECS },
  { id: "document-bag", name: "Document Bag", categoryId: "office-bags", image: "/assets/products/document-bag.svg",
    description: "A neat document bag for files, notebooks and tablets.", specs: PLACEHOLDER_SPECS },

  // Sling Bags
  { id: "crossbody-sling", name: "Crossbody Sling", categoryId: "sling-bags", image: "/assets/products/crossbody-sling.svg",
    description: "A compact crossbody sling for hands-free carrying.", specs: PLACEHOLDER_SPECS },
  { id: "chest-sling", name: "Chest Sling", categoryId: "sling-bags", image: "/assets/products/chest-sling.svg",
    description: "A chest sling bag for light everyday essentials.", specs: PLACEHOLDER_SPECS },

  // Other Products
  { id: "tote-bag", name: "Tote Bag", categoryId: "other-products", image: "/assets/products/tote-bag.svg",
    description: "An open-top tote for shopping and everyday use.", specs: PLACEHOLDER_SPECS },
  { id: "utility-pouch", name: "Utility Pouch", categoryId: "other-products", image: "/assets/products/utility-pouch.svg",
    description: "A zipped utility pouch for organising small items.", specs: PLACEHOLDER_SPECS },
];

export const heroSlides = [
  { image: "/assets/hero/slide-1.svg", alt: "Assorted premium bags: duffle, backpack and laptop bag" },
  { image: "/assets/hero/slide-2.svg", alt: "Backpack, travel trolley and school bag" },
  { image: "/assets/hero/slide-3.svg", alt: "Messenger bag, sling bag and tote" },
];

/** Products belonging to a category. */
export function productsInCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}
