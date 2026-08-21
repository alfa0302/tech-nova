import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";

export default function CartHeader({ count }) {
  return (
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

        <p className="hidden text-sm text-black/40 sm:block">{count} items</p>
      </div>
    </section>
  );
}
