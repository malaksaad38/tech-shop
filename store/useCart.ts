"use client";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item, qty = 1) => {
        const cart = get().cart;
        const existing = cart.find(p => p._id === item._id);

        if (existing) {
          set({
            cart: cart.map(p =>
              p._id === item._id
                ? {...p, quantity: p.quantity + qty}
                : p
            ),
          });
        } else {
          set({cart: [...cart, {...item, quantity: qty}]});
        }
      },

      removeFromCart: (id) => {
        set({cart: get().cart.filter(p => p._id !== id)});
      },

      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          set({cart: get().cart.filter(p => p._id !== id)});
        } else {
          set({
            cart: get().cart.map(p =>
              p._id === id ? {...p, quantity: qty} : p
            ),
          });
        }
      },

      clearCart: () => set({cart: []}),
    }),
    {name: "cart-storage"} // persists in localStorage
  )
);
