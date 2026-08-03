import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPKR } from "../lib/format";
import { CodIcon, CardIcon, EasyPaisaIcon, JazzCashIcon } from "../components/PaymentIcons";

const FREE_DELIVERY_THRESHOLD = 5000;
const DELIVERY_FEE = 250;

const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
];

const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    hint: "Pay in cash when your order arrives",
    Icon: CodIcon,
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    hint: "Visa, Mastercard",
    Icon: CardIcon,
  },
  {
    id: "easypaisa",
    label: "EasyPaisa",
    hint: "Pay via EasyPaisa mobile account",
    Icon: EasyPaisaIcon,
  },
  {
    id: "jazzcash",
    label: "JazzCash",
    hint: "Pay via JazzCash mobile account",
    Icon: JazzCashIcon,
  },
];

function generateOrderNumber() {
  return `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: PROVINCES[0],
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [walletNumber, setWalletNumber] = useState("");
  const [placing, setPlacing] = useState(false);

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  if (items.length === 0 && !placing) {
    return <Navigate to="/cart" replace />;
  }

  function updateForm(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    setPlacing(true);

    const order = {
      orderNumber: generateOrderNumber(),
      items,
      subtotal,
      delivery,
      total,
      paymentMethod,
      customer: form,
      placedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      clearCart();
      navigate("/order-confirmation", { state: { order } });
    }, 600);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display mb-8 text-3xl italic text-plum-700">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="font-display text-xl text-plum-700">Contact Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Full name"
                value={form.fullName}
                onChange={(e) => updateForm("fullName", e.target.value)}
                className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400"
              />
              <input
                required
                type="tel"
                pattern="0[0-9]{10}"
                title="11-digit phone number, e.g. 03001234567"
                placeholder="Phone (03XXXXXXXXX)"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400 sm:col-span-2"
              />
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl text-plum-700">Shipping Address</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Street address"
                value={form.address}
                onChange={(e) => updateForm("address", e.target.value)}
                className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400 sm:col-span-2"
              />
              <input
                required
                placeholder="City"
                value={form.city}
                onChange={(e) => updateForm("city", e.target.value)}
                className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400"
              />
              <select
                value={form.province}
                onChange={(e) => updateForm("province", e.target.value)}
                className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400"
              >
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input
                placeholder="Postal code (optional)"
                value={form.postalCode}
                onChange={(e) => updateForm("postalCode", e.target.value)}
                className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400"
              />
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl text-plum-700">Payment Method</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PAYMENT_METHODS.map(({ id, label, hint, Icon }) => (
                <label
                  key={id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                    paymentMethod === id
                      ? "border-rose-400 bg-blush-50"
                      : "border-rose-200 bg-white hover:border-rose-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={id}
                    checked={paymentMethod === id}
                    onChange={() => setPaymentMethod(id)}
                    className="sr-only"
                  />
                  <Icon className="h-8 w-8 flex-none text-rose-500" />
                  <span>
                    <span className="block text-sm font-medium text-plum-700">{label}</span>
                    <span className="block text-xs text-plum-500">{hint}</span>
                  </span>
                </label>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl border border-rose-100 bg-blush-50 p-5 sm:grid-cols-2">
                <input
                  required
                  placeholder="Name on card"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails((c) => ({ ...c, name: e.target.value }))}
                  className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400 sm:col-span-2"
                />
                <input
                  required
                  inputMode="numeric"
                  pattern="[0-9\s]{16,19}"
                  maxLength={19}
                  placeholder="Card number"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails((c) => ({ ...c, number: e.target.value }))}
                  className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400 sm:col-span-2"
                />
                <input
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails((c) => ({ ...c, expiry: e.target.value }))}
                  className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400"
                />
                <input
                  required
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails((c) => ({ ...c, cvv: e.target.value }))}
                  className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400"
                />
                <p className="text-xs text-plum-500 sm:col-span-2">
                  Demo checkout — this is a sample store; no real payment is processed.
                </p>
              </div>
            )}

            {(paymentMethod === "easypaisa" || paymentMethod === "jazzcash") && (
              <div className="mt-4 rounded-xl border border-rose-100 bg-blush-50 p-5">
                <input
                  required
                  type="tel"
                  pattern="0[0-9]{10}"
                  title="11-digit mobile account number, e.g. 03001234567"
                  placeholder={`${paymentMethod === "easypaisa" ? "EasyPaisa" : "JazzCash"} account number (03XXXXXXXXX)`}
                  value={walletNumber}
                  onChange={(e) => setWalletNumber(e.target.value)}
                  className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400"
                />
                <p className="mt-2 text-xs text-plum-500">
                  Demo checkout — you'll receive a payment request notification on this
                  number at time of order (simulated for this sample store).
                </p>
              </div>
            )}
          </section>
        </div>

        <div className="h-fit rounded-2xl border border-rose-100 bg-blush-50 p-6">
          <h2 className="font-display text-xl text-plum-700">Order Summary</h2>
          <ul className="mt-4 flex max-h-64 flex-col gap-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-2 text-sm text-plum-600">
                <span className="line-clamp-1">
                  {item.name} <span className="text-plum-400">× {item.quantity}</span>
                </span>
                <span className="flex-none font-medium text-plum-700">
                  {formatPKR(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-rose-200 pt-4 text-sm text-plum-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{delivery === 0 ? "Free" : formatPKR(delivery)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-rose-200 pt-4 font-display text-lg text-plum-700">
            <span>Total</span>
            <span>{formatPKR(total)}</span>
          </div>
          <button
            type="submit"
            disabled={placing}
            className="mt-6 w-full rounded-full bg-plum-600 py-3 text-sm font-medium tracking-wide text-cream-50 transition-colors hover:bg-rose-500 disabled:opacity-60"
          >
            {placing ? "Placing Order…" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
