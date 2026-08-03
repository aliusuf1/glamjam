import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { categories } from "../data/categories";
import { brands } from "../data/brands";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setCartOpen } = useCart();

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-colors hover:text-rose-500 ${
      isActive ? "text-rose-500" : "text-plum-700"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-rose-100 bg-cream-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="font-display text-2xl italic tracking-wide text-plum-700">
          Aurelle
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink to="/shop" className={linkClass}>
            Shop All
          </NavLink>
          {categories.map((c) => (
            <NavLink key={c.slug} to={`/category/${c.slug}`} className={linkClass}>
              {c.name}
            </NavLink>
          ))}
          <NavLink to="/brands" className={linkClass}>
            Brands
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hidden text-plum-700 hover:text-rose-500 sm:block">
            <Search size={20} />
          </button>
          <button
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className="relative text-plum-700 hover:text-rose-500"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-medium text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-rose-100 px-4 py-3 lg:hidden">
          <NavLink to="/shop" className={linkClass} onClick={() => setMenuOpen(false)}>
            <div className="py-2">Shop All</div>
          </NavLink>
          {categories.map((c) => (
            <NavLink
              key={c.slug}
              to={`/category/${c.slug}`}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              <div className="py-2">{c.name}</div>
            </NavLink>
          ))}
          <NavLink to="/brands" className={linkClass} onClick={() => setMenuOpen(false)}>
            <div className="py-2">Brands</div>
          </NavLink>
          <div className="mt-1 border-t border-rose-100 pt-2 text-xs uppercase tracking-widest text-rose-400">
            Our Brands
          </div>
          {brands.map((b) => (
            <Link
              key={b.slug}
              to={`/brand/${b.slug}`}
              className="py-1.5 text-sm text-plum-700 hover:text-rose-500"
              onClick={() => setMenuOpen(false)}
            >
              {b.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
