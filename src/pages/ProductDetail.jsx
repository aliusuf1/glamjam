import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { getProduct, getRelatedProducts } from "../data/products";
import { getBrand } from "../data/brands";
import { getCategory } from "../data/categories";
import ProductImage from "../components/ProductImage";
import ProductCard from "../components/ProductCard";
import StarRating from "../components/StarRating";
import { formatPKR } from "../lib/format";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  const brand = getBrand(product.brand);
  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 text-xs text-plum-500">
        <Link to="/shop" className="hover:text-rose-500">Shop</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${category?.slug}`} className="hover:text-rose-500">
          {category?.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-plum-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductImage
          type={product.type}
          color={product.color}
          className="aspect-square rounded-3xl"
        />

        <div>
          <Link
            to={`/brand/${brand?.slug}`}
            className="text-xs uppercase tracking-widest text-rose-400 hover:text-rose-500"
          >
            {brand?.name}
          </Link>
          <h1 className="font-display mt-2 text-3xl italic text-plum-700 sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3">
            <StarRating rating={product.rating} reviews={product.reviews} size={16} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl text-plum-700">
              {formatPKR(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-plum-400 line-through">
                {formatPKR(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-plum-600">{product.description}</p>
          <p className="mt-3 text-sm text-plum-500">Size: {product.size}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-rose-200 px-3 py-2">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-full bg-plum-600 px-8 py-3 text-sm font-medium tracking-wide text-cream-50 transition-colors hover:bg-rose-500"
            >
              <ShoppingBag size={16} />
              {added ? "Added to Bag" : "Add to Bag"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-2 rounded-2xl border border-rose-100 bg-blush-50 p-5 text-sm text-plum-600 sm:grid-cols-2">
            <p>Cash on Delivery available</p>
            <p>Card, EasyPaisa &amp; JazzCash accepted</p>
            <p>Free delivery over Rs. 5,000</p>
            <p>Easy 7-day returns</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display mb-6 text-2xl italic text-plum-700">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
