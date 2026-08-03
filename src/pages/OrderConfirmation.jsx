import { Link, Navigate, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { formatPKR } from "../lib/format";

const PAYMENT_LABELS = {
  cod: "Cash on Delivery",
  card: "Credit / Debit Card",
  easypaisa: "EasyPaisa",
  jazzcash: "JazzCash",
};

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 size={56} className="text-rose-500" />
        <h1 className="font-display mt-4 text-3xl italic text-plum-700">
          Thank you, {order.customer.fullName.split(" ")[0]}!
        </h1>
        <p className="mt-2 text-plum-500">
          Your order has been placed and is being prepared with care.
        </p>
        <p className="mt-4 rounded-full bg-blush-100 px-5 py-2 font-display text-lg text-plum-700">
          Order #{order.orderNumber}
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-rose-100 bg-blush-50 p-6">
        <h2 className="font-display text-xl text-plum-700">Order Details</h2>
        <ul className="mt-4 flex flex-col gap-2 divide-y divide-rose-100">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-2 text-sm text-plum-600">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium text-plum-700">
                {formatPKR(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-2 border-t border-rose-200 pt-4 text-sm text-plum-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPKR(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{order.delivery === 0 ? "Free" : formatPKR(order.delivery)}</span>
          </div>
          <div className="flex justify-between font-display text-lg text-plum-700">
            <span>Total</span>
            <span>{formatPKR(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 rounded-2xl border border-rose-100 p-6 sm:grid-cols-2">
        <div>
          <h3 className="font-display text-lg text-plum-700">Shipping To</h3>
          <p className="mt-2 text-sm text-plum-600">
            {order.customer.fullName}
            <br />
            {order.customer.address}
            <br />
            {order.customer.city}, {order.customer.province}
            <br />
            {order.customer.phone}
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg text-plum-700">Payment</h3>
          <p className="mt-2 text-sm text-plum-600">
            {PAYMENT_LABELS[order.paymentMethod]}
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/shop"
          className="inline-block rounded-full bg-plum-600 px-8 py-3 text-sm font-medium tracking-wide text-cream-50 hover:bg-rose-500"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
