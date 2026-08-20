import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";

const product = {
  id: 1,
  name: "AirPods Pro",
  category: "Audio",
  price: 249,
  rating: 4.8,
  reviews: 128,

  description:
    "AirPods Pro deliver an immersive listening experience with active noise cancellation, adaptive audio, and a comfortable in-ear design built for everyday use.",

  images: [
    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=1400&q=90",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1400&q=90",
  ],

  features: [
    "Active Noise Cancellation",
    "Adaptive Audio",
    "Up to 6 hours listening time",
    "MagSafe charging case",
  ],
};

const relatedProducts = [
  {
    id: 2,
    name: "Apple Watch",
    category: "Wearables",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "Portable Speaker",
    category: "Audio",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Audio",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    name: "Wireless Charger",
    category: "Accessories",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [openSection, setOpenSection] = useState("description");

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const previousImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#171717]">
      {/* BACK / BREADCRUMB */}
      <section className="mx-auto max-w-[1500px] px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        <button className="flex items-center gap-2 text-sm text-black/50 transition hover:text-black">
          <ArrowLeft size={16} />
          Back to shop
        </button>
      </section>

      {/* PRODUCT */}
      <section className="mx-auto max-w-[1500px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ================= IMAGE GALLERY ================= */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-3xl bg-white">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="aspect-square w-full object-cover transition duration-500"
              />

              {/* Image navigation */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <button
                  onClick={previousImage}
                  className="grid size-11 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white"
                >
                  <ArrowLeft size={17} />
                </button>

                <div className="rounded-full bg-black/70 px-4 py-2 text-xs text-white backdrop-blur">
                  {selectedImage + 1} / {product.images.length}
                </div>

                <button
                  onClick={nextImage}
                  className="grid size-11 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-xl bg-white transition ${
                    selectedImage === index
                      ? "ring-2 ring-black ring-offset-2 ring-offset-[#f5f5f2]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div className="flex flex-col lg:pt-4">
            {/* Category */}
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-black/40">
              {product.category}
            </p>

            {/* Title */}
            <div className="mt-3 flex items-start justify-between gap-5">
              <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
                {product.name}
              </h1>

              <button
                onClick={() => setLiked(!liked)}
                className={`grid size-11 shrink-0 place-items-center rounded-full border transition ${
                  liked
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white hover:border-black/30"
                }`}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    fill="currentColor"
                    className="text-black"
                  />
                ))}
              </div>

              <span className="text-sm font-medium">{product.rating}</span>

              <span className="text-sm text-black/40">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="mt-7 text-2xl font-medium">${product.price}</p>

            {/* Description */}
            <p className="mt-6 max-w-xl text-sm leading-7 text-black/55">
              {product.description}
            </p>

            {/* Divider */}
            <div className="my-8 h-px bg-black/10" />

            {/* Features */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em]">
                Highlights
              </p>

              <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-black/60"
                  >
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-black" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-9">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em]">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-full border border-black/10 bg-white">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="grid size-11 place-items-center text-black/60 transition hover:text-black"
                >
                  <Minus size={15} />
                </button>

                <span className="w-8 text-center text-sm">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="grid size-11 place-items-center text-black/60 transition hover:text-black"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button className="flex h-14 items-center justify-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition hover:bg-black/80">
                <ShoppingBag size={17} />
                Add to cart
              </button>

              <button className="h-14 rounded-full border border-black/10 bg-white px-7 text-sm font-medium transition hover:border-black/30">
                Buy now
              </button>
            </div>

            {/* Shipping info */}
            <div className="mt-8 grid grid-cols-3 border-y border-black/10 py-6">
              <div className="flex flex-col gap-2">
                <Truck size={18} strokeWidth={1.5} />
                <p className="text-xs font-medium">Free delivery</p>
                <p className="text-[11px] text-black/40">On orders over $100</p>
              </div>

              <div className="flex flex-col gap-2 border-x border-black/10 px-4">
                <ShieldCheck size={18} strokeWidth={1.5} />
                <p className="text-xs font-medium">2 year warranty</p>
                <p className="text-[11px] text-black/40">Full product cover</p>
              </div>

              <div className="flex flex-col gap-2 pl-4">
                <RotateCcw size={18} strokeWidth={1.5} />
                <p className="text-xs font-medium">Easy returns</p>
                <p className="text-[11px] text-black/40">30 day returns</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
              {/* Description */}
              <div>
                <button
                  onClick={() => toggleSection("description")}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-sm font-medium">
                    Product description
                  </span>

                  <ChevronDown
                    size={17}
                    className={`transition-transform ${
                      openSection === "description" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSection === "description" && (
                  <p className="pb-5 text-sm leading-6 text-black/50">
                    Designed for everyday listening, AirPods Pro combine
                    powerful sound with intelligent noise control. The compact
                    charging case keeps your earbuds ready throughout the day
                    while the adaptive experience automatically adjusts to your
                    environment.
                  </p>
                )}
              </div>

              {/* Specifications */}
              <div>
                <button
                  onClick={() => toggleSection("specifications")}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-sm font-medium">Specifications</span>

                  <ChevronDown
                    size={17}
                    className={`transition-transform ${
                      openSection === "specifications" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSection === "specifications" && (
                  <div className="grid grid-cols-2 gap-y-4 pb-5 text-sm">
                    <span className="text-black/40">Connectivity</span>
                    <span>Bluetooth 5.3</span>

                    <span className="text-black/40">Battery</span>
                    <span>Up to 6 hours</span>

                    <span className="text-black/40">Charging</span>
                    <span>USB-C / MagSafe</span>

                    <span className="text-black/40">Weight</span>
                    <span>5.3 g</span>
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div>
                <button
                  onClick={() => toggleSection("shipping")}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-sm font-medium">
                    Shipping & returns
                  </span>

                  <ChevronDown
                    size={17}
                    className={`transition-transform ${
                      openSection === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSection === "shipping" && (
                  <p className="pb-5 text-sm leading-6 text-black/50">
                    Orders are dispatched within 1–2 business days. Standard
                    delivery typically takes 3–5 business days. Returns are
                    accepted within 30 days of delivery.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-black/40">
                You may also like
              </p>

              <h2 className="text-3xl font-semibold tracking-[-0.04em]">
                Complete your setup.
              </h2>
            </div>

            <button className="hidden items-center gap-2 text-sm text-black/60 sm:flex">
              Shop all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 lg:gap-x-5">
            {relatedProducts.map((item) => (
              <article key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-[#f5f5f2]">
                  <button className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white/80 backdrop-blur">
                    <Heart size={15} />
                  </button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[260px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[320px]"
                  />

                  <button className="absolute bottom-3 left-3 right-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ShoppingBag size={14} />
                    Add to cart
                  </button>
                </div>

                <div className="flex items-start justify-between gap-3 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-black/35">
                      {item.category}
                    </p>

                    <h3 className="mt-1 text-sm font-medium sm:text-base">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-sm font-medium">${item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
