import { Link } from "react-router-dom";
import HeroBackground from "./HeroBackground";
import ProductImage from "./ProductImage";

const SHOWCASE = [
  { type: "perfume", color: "#a05066", offset: "mt-8" },
  { type: "compact", color: "#c19a55", offset: "" },
  { type: "lipstick", color: "#6b3547", offset: "" },
  { type: "jar", color: "#b96f83", offset: "mt-8" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blush-100 via-cream-100 to-rose-100">
      <HeroBackground />
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-gold-300/30 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 lg:flex-row lg:py-28 lg:text-left">
        <div className="flex-1">
          <span className="inline-block rounded-full border border-rose-300 px-4 py-1 text-xs uppercase tracking-[0.2em] text-rose-500">
            New Season Edit
          </span>
          <h1 className="font-display mt-5 text-5xl italic leading-[1.1] text-plum-700 sm:text-6xl lg:text-7xl">
            Beauty, in its
            <br /> most gracious form.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-plum-500 lg:mx-0">
            Considered makeup, skincare and fragrance from six house-loved
            brands — curated for a routine that feels like a small daily
            ritual.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              to="/shop"
              className="rounded-full bg-plum-600 px-8 py-3 text-sm font-medium tracking-wide text-cream-50 shadow-soft transition-colors hover:bg-rose-500"
            >
              Shop the Edit
            </Link>
            <Link
              to="/brands"
              className="rounded-full border border-plum-600 px-8 py-3 text-sm font-medium tracking-wide text-plum-700 transition-colors hover:border-rose-400 hover:text-rose-500"
            >
              Explore Brands
            </Link>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
            {SHOWCASE.map((item, i) => (
              <div
                key={i}
                className={`${item.offset} aspect-[3/4] overflow-hidden rounded-3xl border border-white/40 bg-white/25 shadow-soft backdrop-blur-md`}
              >
                <ProductImage
                  type={item.type}
                  color={item.color}
                  transparent
                  className="h-full w-full opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
