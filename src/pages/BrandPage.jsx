import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getBrand } from "../data/brands";
import { getProductsByBrand } from "../data/products";
import { getCategory } from "../data/categories";
import ProductCard from "../components/ProductCard";
import ProductToolbar from "../components/ProductToolbar";
import { sortProducts } from "../lib/sort";

export default function BrandPage() {
  const { slug } = useParams();
  const brand = getBrand(slug);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortKey, setSortKey] = useState("featured");

  const brandProducts = useMemo(
    () => (brand ? getProductsByBrand(brand.slug) : []),
    [brand]
  );

  const brandCategories = useMemo(() => {
    const slugs = [...new Set(brandProducts.map((p) => p.category))];
    return slugs.map((s) => getCategory(s)).filter(Boolean);
  }, [brandProducts]);

  const filtered = useMemo(() => {
    const list =
      activeCategory === "all"
        ? brandProducts
        : brandProducts.filter((p) => p.category === activeCategory);
    return sortProducts(list, sortKey);
  }, [brandProducts, activeCategory, sortKey]);

  if (!brand) return <Navigate to="/brands" replace />;

  return (
    <div>
      <div className="bg-plum-700 px-4 py-16 text-center sm:px-6">
        <span className="text-xs uppercase tracking-[0.2em] text-gold-300">
          House of Aurelle
        </span>
        <h1 className="font-display mt-2 text-4xl italic text-cream-50">
          {brand.name}
        </h1>
        <p className="mt-1 text-gold-300">{brand.tagline}</p>
        <p className="mx-auto mt-4 max-w-xl text-sm text-blush-100/80">
          {brand.description}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {brandCategories.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                activeCategory === "all"
                  ? "border-rose-500 bg-rose-500 text-white"
                  : "border-rose-200 text-plum-600 hover:border-rose-400"
              }`}
            >
              All
            </button>
            {brandCategories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  activeCategory === c.slug
                    ? "border-rose-500 bg-rose-500 text-white"
                    : "border-rose-200 text-plum-600 hover:border-rose-400"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        <ProductToolbar count={filtered.length} sortKey={sortKey} onSortChange={setSortKey} />

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
