import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import useCartPage from "../hooks/useCartPage";
import CartHeader from "../components/cart/CartHeader";
import EmptyCart from "../components/cart/EmptyCart";
import { centsToAED } from "../utils/helper";

export default function Cart() {
  const {
    products,
    setQuantity,
    removeProduct,
    productsLoading,
    productsError,
    lines,
    subtotal,
    checkout,
    checkoutLoading,
  } = useCartPage();
  console.log(products);
  if (products.length === 0) return <EmptyCart />;
  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#171717] pt-20">
      <CartHeader count={products?.length} />

      <section className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="border-b border-black/10 px-5 py-4 sm:px-7">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Cart items
              </p>
            </div>
            <div className="divide-y divide-black/10">
              {lines.map(({ product, line }, index) => (
                <article
                  key={`${product?.id}_${product?.slug}_${index}`}
                  className="flex gap-4 p-5 sm:gap-6 sm:p-7"
                >
                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f2] sm:h-36 sm:w-36">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-black/35">
                          {product?.category}
                        </p>

                        <h2 className="mt-1 text-sm font-medium sm:text-base">
                          {product?.name}
                        </h2>
                      </div>

                      <p className="shrink-0 text-sm font-medium">
                        {centsToAED(product?.priceCents * line.quantity)}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-black/10">
                        <button
                          className="grid size-8 place-items-center text-black/50 transition hover:text-black"
                          onClick={() => {
                            setQuantity(product?.id, line?.quantity - 1);
                          }}
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-7 text-center text-xs font-medium">
                          {line.quantity}
                        </span>

                        <button
                          className="grid size-8 place-items-center text-black/50 transition hover:text-black"
                          onClick={() => {
                            setQuantity(product?.id, line?.quantity + 1);
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        className="flex items-center gap-1.5 text-xs text-black/40 transition hover:text-red-600"
                        onClick={() => removeProduct(product?.id)}
                      >
                        <Trash2 size={14} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-black/10 bg-white p-5 sm:p-7 lg:sticky lg:top-6">
            <h2 className="text-lg font-medium">Order summary</h2>

            <div className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-black/50">Subtotal</span>
                <span>{centsToAED(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-black/50">Shipping</span>
                <span>
                  <span className="font-medium text-[#376044]">Free</span>
                </span>
              </div>
            </div>

            <div className="my-6 border-t border-black/10" />

            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>

              <span className="text-xl font-semibold tracking-tight">
                {centsToAED(subtotal)}
              </span>
            </div>

            <div className="mt-7">
              <label className="mb-2 block text-xs text-black/40">
                Promo code
              </label>

              <div className="flex rounded-full border border-black/10 p-1">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="min-w-0 flex-1 bg-transparent px-4 text-xs outline-none placeholder:text-black/30 disabled:cursor-not-allowed"
                  disabled={true}
                />

                <button
                  className="rounded-full bg-[#f1f1ed] px-4 py-2 text-xs font-medium disabled:cursor-not-allowed"
                  disabled={true}
                >
                  Apply
                </button>
              </div>
            </div>

            <button
              className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-black py-4 text-sm font-medium text-white transition hover:bg-black/80"
              onClick={() => checkout()}
            >
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
