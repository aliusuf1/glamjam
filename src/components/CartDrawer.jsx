import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductImage from "./ProductImage";
import { formatPKR } from "../lib/format";

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeItem, subtotal } =
    useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-plum-900/40 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-cream-50 shadow-lift">
        <div className="flex items-center justify-between border-b border-rose-100 px-5 py-4">
          <h2 className="font-display text-xl text-plum-700">
            Your Bag ({items.length})
          </h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close">
            <X size={20} className="text-plum-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="text-plum-500">Your bag is empty.</p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-plum-600 px-5 py-2 text-sm text-cream-50 hover:bg-rose-500"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <ProductImage
                    type={item.type}
                    color={item.color}
                    className="h-20 w-20 flex-none rounded-xl"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="font-display text-base text-plum-700 hover:text-rose-500"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-plum-400 hover:text-rose-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <span className="text-xs text-plum-500">{item.size}</span>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-rose-200 px-2 py-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-sm">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-display text-plum-700">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-rose-100 px-5 py-4">
            <div className="mb-3 flex items-center justify-between font-display text-lg text-plum-700">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full rounded-full bg-plum-600 py-3 text-center text-sm font-medium tracking-wide text-cream-50 hover:bg-rose-500"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="mt-2 block w-full rounded-full border border-rose-200 py-3 text-center text-sm font-medium tracking-wide text-plum-700 hover:border-rose-400"
            >
              View Bag
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
