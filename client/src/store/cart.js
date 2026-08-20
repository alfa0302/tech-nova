import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set, get) => ({
      products: [
        { productId: "1af284b2-7d70-48f7-b8ca-0b3c6ca18a51", quantity: 2 },
        { productId: "fc94797f-7928-46b7-9b3f-1c1c41aa5c32", quantity: 1 },
      ],
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
        set({
          products: get().products.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
        });
      },
      clearCart() {
        set({ products: [] });
      },
    }),
    { name: "nova-cart" },
  ),
);
