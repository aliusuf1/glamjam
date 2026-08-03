import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import BrandStrip from "../components/BrandStrip";
import Newsletter from "../components/Newsletter";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  const bestsellers = products.filter((p) => p.tags?.includes("bestseller")).slice(0, 8);
  const newArrivals = products.filter((p) => p.tags?.includes("new")).slice(0, 4);

  return (
    <div>
      <Hero />
      <CategoryGrid />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-rose-400">
              Loved by Regulars
            </span>
            <h2 className="font-display mt-2 text-3xl italic text-plum-700 sm:text-4xl">
              Bestsellers
            </h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-rose-500 hover:text-plum-700 sm:block">
            Shop all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <BrandStrip />

      {newArrivals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-rose-400">
              Just Landed
            </span>
            <h2 className="font-display mt-2 text-3xl italic text-plum-700 sm:text-4xl">
              New Arrivals
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <Newsletter />
    </div>
  );
}
