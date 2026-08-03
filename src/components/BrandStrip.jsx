import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brands } from "../data/brands";

export default function BrandStrip() {
  return (
    <section className="bg-plum-700 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold-300">
              House of Aurelle
            </span>
            <h2 className="font-display mt-2 text-3xl italic text-cream-50 sm:text-4xl">
              Our Brands
            </h2>
          </div>
          <Link
            to="/brands"
            className="hidden items-center gap-1 text-sm text-gold-300 hover:text-cream-50 sm:flex"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => (
            <Link
              key={b.slug}
              to={`/brand/${b.slug}`}
              className="group rounded-2xl border border-cream-50/10 bg-plum-800/60 p-6 transition-colors hover:border-gold-400/60"
            >
              <h3 className="font-display text-xl text-cream-50 group-hover:text-gold-300">
                {b.name}
              </h3>
              <p className="mt-2 text-sm text-blush-100/70">{b.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
