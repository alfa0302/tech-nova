import { apiFetch } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../store/cart";
import { useState } from "react";
import { useAuth } from "@clerk/react";

export default function useCartPage() {
  const { getToken } = useAuth();
  const { products, setQuantity, removeProduct } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const {
    data,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch("/api/products"),
    enabled: products?.length > 0,
  });
  const prods = data?.products ?? [];
  const byId = new Map(prods.map((p) => [p.id, p]));
  const lines =
    products
      ?.filter((line) => line && line.productId)
      .map((line) => ({
        line,
        product: byId.get(line.productId) ?? null,
      })) ?? [];

  const subtotal = lines.reduce((sum, { line, product }) => {
    if (!product || !line) return sum;
    return sum + line.quantity * product.priceCents;
  }, 0);

  async function checkout() {
    setCheckoutLoading(true);
    const body = {
      items: lines.map(({ line, product }) => ({
        productId: product.id,
        quantity: line.quantity,
      })),
    };
    const res = await apiFetch("/api/checkout", {
      getToken,
      method: "POST",
      body,
    });
    if (res?.checkoutUrl) {
      window.location.href = res.checkoutUrl;
      return;
    }

    setCheckoutLoading(false);
  }

  return {
    products,
    setQuantity,
    removeProduct,
    productsLoading,
    productsError,
    lines,
    subtotal,
    checkout,
    checkoutLoading,
  };
}
