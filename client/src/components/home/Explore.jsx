import {
  ShoppingBag,
  ArrowUpRight,
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";

export default function Explore() {
  return (
    <section className="mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-white">
      <div className="relative min-h-120 overflow-hidden rounded-4xl bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1920&q=80"
            alt="Workspace"
            className="h-full w-full object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 flex min-h-120 items-center justify-center px-7 py-16 text-center sm:px-12 lg:px-20">
          <div className="max-w-2xl">
            <p className="section-label text-white">Premium gadgets</p>

            <h2 className="text-3xl font-light text-white sm:text-5xl lg:text-6xl">
              Upgrade your <br className="hidden sm:block" />
              <span className="font-semibold">digital toolkit</span>
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white sm:mt-6">
              Curated tech essentials for the modern professional. Thoughtfully
              designed. Built to last.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="group btn-white-border">
                Shop now
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <button className="group btn-white">
                <span>Explore</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white">
              <span className="flex items-center gap-1.5">
                <Shield size={14} />
                Secure checkout
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={14} />
                Free shipping
              </span>
              <span className="flex items-center gap-1.5">
                <RotateCcw size={14} />
                Easy returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
