import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set, get) => ({
      products: [],
      addProduct(productId, qty = 1) {
        const items = [...get().products];
        const i = items.findIndex((item) => item.productId === productId);
        if (i >= 0) {
          items[i] = { ...items[i], quantity: items[i].quantity + qty };
        } else {
          items.push({ productId, quantity: qty });
        }
        set({ products: items });
      },
      removeProduct(productId) {
        set({
          products: get().products.filter(
            (item) => item.productId !== productId,
          ),
        });
      },
      setQuantity(productId, quantity) {
        if (quantity <= 0) {
          set({
            products: get().products.filter(
              (item) => item.productId !== productId,
            ),
          });
          return;
        }
        const products = get().products.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        );
        set({ products });
      },
      clearCart() {
        set({ products: [] });
      },
    }),
    { name: "nova-cart" },
  ),
);
