import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import { Link } from "react-router";

export default function EmptyCart() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6 mt-20">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white py-16 px-4 text-center">
        <div className="mb-6 grid size-20 place-items-center rounded-full bg-[#f5f5f2]">
          <Truck size={32} className="text-black" />
        </div>
        <h2 className="text-2xl font-medium">Your cart is empty</h2>
        <p className="mt-2 text-black/50">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/shop"
          className="mt-6 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-black/80"
        >
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
