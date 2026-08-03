export const categories = [
  {
    slug: "makeup",
    name: "Makeup",
    tagline: "Colour that flatters every complexion",
    accent: "#b96f83",
  },
  {
    slug: "skincare",
    name: "Skincare",
    tagline: "Rituals for radiant, healthy skin",
    accent: "#c19a55",
  },
  {
    slug: "haircare",
    name: "Haircare",
    tagline: "Nourishment from root to tip",
    accent: "#8a5b6e",
  },
  {
    slug: "fragrance",
    name: "Fragrance",
    tagline: "Signature scents, beautifully bottled",
    accent: "#a05066",
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "The tools every routine deserves",
    accent: "#6b3547",
  },
];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}
