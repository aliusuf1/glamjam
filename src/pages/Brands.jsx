import { Link } from "react-router-dom";
import { brands } from "../data/brands";
import { getProductsByBrand } from "../data/products";

export default function Brands() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-rose-400">
          House of Aurelle
        </span>
        <h1 className="font-display mt-2 text-4xl italic text-plum-700">
          Our Brands
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-plum-500">
          Six distinct houses, one shared standard for quality — each with its
          own point of view on beauty.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <Link
            key={b.slug}
            to={`/brand/${b.slug}`}
            className="group flex flex-col rounded-2xl border border-rose-100 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <h2 className="font-display text-2xl text-plum-700 group-hover:text-rose-500">
              {b.name}
            </h2>
            <p className="mt-1 text-sm italic text-rose-400">{b.tagline}</p>
            <p className="mt-3 flex-1 text-sm text-plum-500">{b.description}</p>
            <span className="mt-4 text-xs uppercase tracking-widest text-gold-600">
              {getProductsByBrand(b.slug).length} products
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
