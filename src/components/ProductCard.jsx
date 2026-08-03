import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import ProductImage from "./ProductImage";
import StarRating from "./StarRating";
import { formatPKR } from "../lib/format";
import { getBrand } from "../data/brands";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const brand = getBrand(product.brand);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to={`/product/${product.slug}`} className="relative block aspect-[4/5]">
        <ProductImage type={product.type} color={product.color} className="h-full w-full" />
        {product.tags?.includes("bestseller") && (
          <span className="absolute left-3 top-3 rounded-full bg-plum-600 px-3 py-1 text-[11px] font-medium tracking-wide text-cream-50">
            Bestseller
          </span>
        )}
        {product.tags?.includes("new") && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-medium tracking-wide text-white">
            New
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-[11px] font-medium tracking-wide text-white">
            Sale
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-[11px] uppercase tracking-widest text-rose-400">
          {brand?.name}
        </span>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-lg leading-snug text-plum-700 hover:text-rose-500">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg text-plum-700">
              {formatPKR(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-plum-400 line-through">
                {formatPKR(product.oldPrice)}
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-plum-600 text-cream-50 transition-colors hover:bg-rose-500"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
