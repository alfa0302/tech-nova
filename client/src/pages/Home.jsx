import {
  ArrowUpRight,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  ShoppingBag,
} from "lucide-react";
import { useHomeCatalog } from "../hooks/useHomeCatalog";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import Benefits from "../components/home/Benefits";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Explore from "../components/home/Explore";

export default function Home() {
  const {
    products,
    categories,
    categoryChipsLoading,
    error,
    loadingCategories,
    loadingList,
  } = useHomeCatalog();
  const featured = products?.slice(0, 4) || [];
  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#171717]">
      <Hero />
      <Categories
        categories={categories}
        loadingCategories={loadingCategories}
      />
      <FeaturedProducts products={featured} loadingList={loadingList} />
      <Benefits />
      <Explore />
    </main>
  );
}
