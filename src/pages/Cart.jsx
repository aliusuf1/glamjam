import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductImage from "../components/ProductImage";
import { formatPKR } from "../lib/format";

const FREE_DELIVERY_THRESHOLD = 5000;
const DELIVERY_FEE = 250;

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const delivery = items.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl italic text-plum-700">Your bag is empty</h1>
        <p className="mt-3 text-plum-500">
          Discover something you'll love from our full collection.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-plum-600 px-8 py-3 text-sm font-medium tracking-wide text-cream-50 hover:bg-rose-500"
        >
          Shop All
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display mb-8 text-3xl italic text-plum-700">Your Bag</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="flex flex-col divide-y divide-rose-100">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 py-5">
              <ProductImage
                type={item.type}
                color={item.color}
                className="h-24 w-24 flex-none rounded-2xl"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-display text-lg text-plum-700 hover:text-rose-500"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-plum-500">{item.size}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-plum-400 hover:text-rose-500"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-3 rounded-full border border-rose-200 px-3 py-1.5">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm">{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-display text-lg text-plum-700">
                    {formatPKR(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-2xl border border-rose-100 bg-blush-50 p-6">
          <h2 className="font-display text-xl text-plum-700">Order Summary</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm text-plum-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{delivery === 0 ? "Free" : formatPKR(delivery)}</span>
            </div>
            {delivery > 0 && (
              <p className="text-xs text-rose-500">
                Free delivery on orders over {formatPKR(FREE_DELIVERY_THRESHOLD)}
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-between border-t border-rose-200 pt-4 font-display text-lg text-plum-700">
            <span>Total</span>
            <span>{formatPKR(total)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block w-full rounded-full bg-plum-600 py-3 text-center text-sm font-medium tracking-wide text-cream-50 hover:bg-rose-500"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/shop"
            className="mt-3 block w-full rounded-full border border-rose-200 py-3 text-center text-sm font-medium tracking-wide text-plum-700 hover:border-rose-400"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
