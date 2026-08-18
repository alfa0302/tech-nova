import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "AirPods Pro",
    category: "Wireless Audio",
    price: 249,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Wireless Charger",
    category: "Accessories",
    price: 69,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=700&q=85",
  },
];

export default function Cart() {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 75 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#171717]">
      {/* HEADER */}
      <section className="mx-auto max-w-[1200px] px-4 pb-10 pt-10 sm:px-6">
        <div className="flex items-center gap-3 text-sm text-black/40">
          <a
            href="/shop"
            className="flex items-center gap-2 transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Continue shopping
          </a>
        </div>

        <div className="mt-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-black/40">
              Your selection
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
              Your cart.
            </h1>
          </div>

          <p className="hidden text-sm text-black/40 sm:block">
            {cartItems.length} items
          </p>
        </div>
      </section>

      {/* CART CONTENT */}
      <section className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* ITEMS */}
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="border-b border-black/10 px-5 py-4 sm:px-7">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Cart items
              </p>
            </div>

            <div className="divide-y divide-black/10">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-4 p-5 sm:gap-6 sm:p-7"
                >
                  {/* IMAGE */}
                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f2] sm:h-36 sm:w-36">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-black/35">
                          {item.category}
                        </p>

                        <h2 className="mt-1 text-sm font-medium sm:text-base">
                          {item.name}
                        </h2>
                      </div>

                      <p className="shrink-0 text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      {/* QUANTITY */}
                      <div className="flex items-center rounded-full border border-black/10">
                        <button className="grid size-8 place-items-center text-black/50 transition hover:text-black">
                          <Minus size={14} />
                        </button>

                        <span className="w-7 text-center text-xs font-medium">
                          {item.quantity}
                        </span>

                        <button className="grid size-8 place-items-center text-black/50 transition hover:text-black">
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* REMOVE */}
                      <button className="flex items-center gap-1.5 text-xs text-black/40 transition hover:text-red-600">
                        <Trash2 size={14} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <aside className="h-fit rounded-2xl border border-black/10 bg-white p-5 sm:p-7 lg:sticky lg:top-6">
            <h2 className="text-lg font-medium">Order summary</h2>

            <div className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-black/50">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-black/50">Shipping</span>

                <span>
                  {shipping === 0 ? (
                    <span className="font-medium text-[#376044]">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-black/50">Estimated tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="my-6 border-t border-black/10" />

            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>

              <span className="text-xl font-semibold tracking-tight">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* PROMO CODE */}
            <div className="mt-7">
              <label className="mb-2 block text-xs text-black/40">
                Promo code
              </label>

              <div className="flex rounded-full border border-black/10 p-1">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="min-w-0 flex-1 bg-transparent px-4 text-xs outline-none placeholder:text-black/30"
                />

                <button className="rounded-full bg-[#f1f1ed] px-4 py-2 text-xs font-medium transition hover:bg-black hover:text-white">
                  Apply
                </button>
              </div>
            </div>

            {/* CHECKOUT */}
            <button className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-black py-4 text-sm font-medium text-white transition hover:bg-black/80">
              Proceed to checkout
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <p className="mt-4 text-center text-[11px] leading-5 text-black/35">
              Taxes and shipping are calculated based on your delivery address.
            </p>
          </aside>
        </div>

        {/* BENEFITS */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white px-5 py-5">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f5f5f2]">
              <Truck size={18} strokeWidth={1.6} />
            </div>

            <div>
              <h3 className="text-sm font-medium">Free delivery</h3>

              <p className="mt-1 text-xs text-black/40">
                Your order qualifies for free shipping.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white px-5 py-5">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f5f5f2]">
              <ShieldCheck size={18} strokeWidth={1.6} />
            </div>

            <div>
              <h3 className="text-sm font-medium">Secure checkout</h3>

              <p className="mt-1 text-xs text-black/40">
                Your payment information is protected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
