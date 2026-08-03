export const brands = [
  {
    slug: "aurelle-signature",
    name: "Aurelle Signature",
    tagline: "Our house line — where it all began",
    description:
      "Aurelle Signature is our founding collection: clean, elegant formulas across makeup, skin and hair, designed to feel like a daily indulgence.",
    focus: ["makeup", "skincare", "haircare", "fragrance", "accessories"],
  },
  {
    slug: "velvet-bloom",
    name: "Velvet Bloom",
    tagline: "Colour cosmetics with a soft-focus finish",
    description:
      "Velvet Bloom specialises in richly pigmented, skin-loving makeup — from second-skin foundations to lipstick shades made for every undertone.",
    focus: ["makeup"],
  },
  {
    slug: "nour-and-co",
    name: "Nour & Co.",
    tagline: "Dermat-loved skincare, simplified",
    description:
      "Nour & Co. builds gentle, ingredient-led skincare around a few things done exceptionally well: hydration, barrier repair and glow.",
    focus: ["skincare"],
  },
  {
    slug: "rose-atelier",
    name: "Rosé Atelier",
    tagline: "Fragrance as a form of memory",
    description:
      "Rosé Atelier is a niche perfume house crafting layered, long-lasting scents in hand-finished bottles worth keeping on the vanity.",
    focus: ["fragrance"],
  },
  {
    slug: "soie-noire",
    name: "Soie Noire",
    tagline: "Silk-smooth hair, from shower to styling",
    description:
      "Soie Noire ('black silk') formulates haircare that restores shine and softness without weighing hair down.",
    focus: ["haircare"],
  },
  {
    slug: "maison-pearl",
    name: "Maison Pearl",
    tagline: "The tools and travel pieces of a polished routine",
    description:
      "Maison Pearl designs the brushes, pouches and mirrors that make a beauty routine feel finished — pearlescent, tactile, built to last.",
    focus: ["accessories"],
  },
];

export function getBrand(slug) {
  return brands.find((b) => b.slug === slug);
}
