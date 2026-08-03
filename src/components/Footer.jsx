import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { categories } from "../data/categories";

function InstagramGlyph({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookGlyph({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M13.5 9.2h1.6V6.9h-1.8c-1.9 0-2.9 1.1-2.9 2.9v1.4H8.9v2.3h1.5V18h2.3v-4.5h1.7l.3-2.3h-2v-1.1c0-.6.2-.9.8-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}
import { brands } from "../data/brands";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-rose-100 bg-plum-800 text-blush-100">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-display text-2xl italic text-cream-50">
            Aurelle
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-blush-100/70">
            Premium cosmetics and beauty accessories, curated for a routine
            that feels a little luxurious every day.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="text-blush-100/70 hover:text-gold-400">
              <InstagramGlyph size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="text-blush-100/70 hover:text-gold-400">
              <FacebookGlyph size={18} />
            </a>
            <a href="mailto:hello@aurelle.com" aria-label="Email" className="text-blush-100/70 hover:text-gold-400">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold-300">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`} className="text-blush-100/70 hover:text-cream-50">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold-300">Brands</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {brands.map((b) => (
              <li key={b.slug}>
                <Link to={`/brand/${b.slug}`} className="text-blush-100/70 hover:text-cream-50">
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold-300">Customer Care</h4>
          <ul className="mt-3 space-y-2 text-sm text-blush-100/70">
            <li>Cash on Delivery available</li>
            <li>Card, EasyPaisa &amp; JazzCash accepted</li>
            <li>Free delivery over Rs. 5,000</li>
            <li>hello@aurelle.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blush-100/10 py-5 text-center text-xs text-blush-100/50">
        © {new Date().getFullYear()} Aurelle Cosmetics. All rights reserved.
      </div>
    </footer>
  );
}
