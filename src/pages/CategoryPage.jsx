import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getCategory } from "../data/categories";
import { getProductsByCategory } from "../data/products";
import { brands } from "../data/brands";
import ProductCard from "../components/ProductCard";
import ProductToolbar from "../components/ProductToolbar";
import FilterSidebar from "../components/FilterSidebar";
import { sortProducts } from "../lib/sort";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategory(slug);
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [sortKey, setSortKey] = useState("featured");

  const categoryProducts = useMemo(
    () => (category ? getProductsByCategory(category.slug) : []),
    [category]
  );

  const availableBrands = useMemo(
    () => brands.filter((b) => categoryProducts.some((p) => p.brand === b.slug)),
    [categoryProducts]
  );

  const filtered = useMemo(() => {
    let list = categoryProducts;
    if (selectedBrands.size > 0) {
      list = list.filter((p) => selectedBrands.has(p.brand));
    }
    return sortProducts(list, sortKey);
  }, [categoryProducts, selectedBrands, sortKey]);

  if (!category) return <Navigate to="/shop" replace />;

  function toggleBrand(value) {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  }

  return (
    <div>
      <div
        className="px-4 py-14 text-center sm:px-6"
        style={{
          background: `linear-gradient(160deg, ${category.accent}18, ${category.accent}40)`,
        }}
      >
        <h1 className="font-display text-4xl italic text-plum-700">{category.name}</h1>
        <p className="mt-2 text-plum-500">{category.tagline}</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
          <FilterSidebar
            groups={[
              {
                title: "Brand",
                options: availableBrands.map((b) => ({ value: b.slug, label: b.name })),
                selected: selectedBrands,
                onToggle: toggleBrand,
              },
            ]}
          />

          <div>
            <ProductToolbar
              count={filtered.length}
              sortKey={sortKey}
              onSortChange={setSortKey}
            />
            {filtered.length === 0 ? (
              <p className="py-16 text-center text-plum-500">
                No products match your filters.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
