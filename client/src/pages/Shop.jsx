import {
  ArrowUpDown,
  ChevronDown,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useHomeCatalog } from "../hooks/useHomeCatalog";
import { centsToAED } from "../utils/helper";

export default function Shop() {
  const {
    products,
    categories,
    categoryChipsLoading,
    categoryFilter,
    error,
    loadingCategories,
    loadingList,
    setCategory,
  } = useHomeCatalog();
  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#171717]">
      <section className="section-padding">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-black/40">
              The collection
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
              Shop gadgets.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-black/50">
              Smart devices and everyday essentials, carefully selected for
              modern living.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-sm">
              <Search size={16} />
              <span className="hidden sm:inline">Search products</span>
            </button>

            <button className="grid size-11 place-items-center rounded-full border border-black/10 bg-white">
              <ShoppingBag size={17} />
            </button>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            <button
              key="All categories"
              onClick={() => setCategory("")}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition ${
                categoryFilter === ""
                  ? "bg-black text-white"
                  : "bg-[#f5f5f2] text-black/60 hover:bg-black/10"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition ${
                  categoryFilter === category
                    ? "bg-black text-white"
                    : "bg-[#f5f5f2] text-black/60 hover:bg-black/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button className="hidden shrink-0 items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm md:flex">
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-between">
          <p className="text-sm text-black/50">{products.length} products</p>

          <button className="flex items-center gap-2 text-sm text-black/60">
            <ArrowUpDown size={16} />
            Sort by
            <ChevronDown size={15} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {products.map((product) => (
            <article key={product.id} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-white">
                <button className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white/80 backdrop-blur-md transition hover:bg-white">
                  <Heart size={16} strokeWidth={1.8} />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[350px]"
                />

                <button className="absolute bottom-3 left-3 right-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-sm">
                  <ShoppingBag size={15} />
                  Add to cart
                </button>
              </div>

              <div className="flex items-start justify-between gap-3 pt-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-black/35">
                    {product.category}
                  </p>

                  <h2 className="mt-1 text-sm font-medium sm:text-base">
                    {product.name}
                  </h2>
                </div>

                <p className="text-sm font-medium">
                  {centsToAED(product.priceCents)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
