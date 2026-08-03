import { useMemo, useState } from "react";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { brands } from "../data/brands";
import ProductCard from "../components/ProductCard";
import ProductToolbar from "../components/ProductToolbar";
import FilterSidebar from "../components/FilterSidebar";
import { sortProducts } from "../lib/sort";

export default function Shop() {
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [sortKey, setSortKey] = useState("featured");

  function toggle(setFn) {
    return (value) => {
      setFn((prev) => {
        const next = new Set(prev);
        next.has(value) ? next.delete(value) : next.add(value);
        return next;
      });
    };
  }

  const filtered = useMemo(() => {
    let list = products;
    if (selectedCategories.size > 0) {
      list = list.filter((p) => selectedCategories.has(p.category));
    }
    if (selectedBrands.size > 0) {
      list = list.filter((p) => selectedBrands.has(p.brand));
    }
    return sortProducts(list, sortKey);
  }, [selectedCategories, selectedBrands, sortKey]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-rose-400">
          The Full Edit
        </span>
        <h1 className="font-display mt-2 text-4xl italic text-plum-700">Shop All</h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <FilterSidebar
          groups={[
            {
              title: "Category",
              options: categories.map((c) => ({ value: c.slug, label: c.name })),
              selected: selectedCategories,
              onToggle: toggle(setSelectedCategories),
            },
            {
              title: "Brand",
              options: brands.map((b) => ({ value: b.slug, label: b.name })),
              selected: selectedBrands,
              onToggle: toggle(setSelectedBrands),
            },
          ]}
        />

        <div>
          <ProductToolbar count={filtered.length} sortKey={sortKey} onSortChange={setSortKey} />
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
  );
}
