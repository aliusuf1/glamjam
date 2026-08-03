import { Link } from "react-router-dom";
import { categories } from "../data/categories";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-rose-400">
          Shop by Category
        </span>
        <h2 className="font-display mt-2 text-3xl italic text-plum-700 sm:text-4xl">
          Find your ritual
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to={`/category/${c.slug}`}
            className="group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl p-4 text-center shadow-soft transition-transform hover:-translate-y-1"
            style={{
              background: `linear-gradient(160deg, ${c.accent}22, ${c.accent}55)`,
            }}
          >
            <div
              className="h-14 w-14 rounded-full transition-transform group-hover:scale-110"
              style={{ background: c.accent }}
            />
            <h3 className="font-display text-lg text-plum-700">{c.name}</h3>
            <p className="hidden text-xs text-plum-500 sm:block">{c.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
