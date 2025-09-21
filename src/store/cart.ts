import { create } from 'zustand';

interface CartItem {
  id: string;
  quantity: number;
  variant: {
    id: string;
    price: number;
    product: {
      id: string;
      name: string;
      // ... other product fields
    };
    images: { url: string }[];
    // ... other product variant fields
  };
}

interface CartState {
  items: CartItem[];
  total: number;
  fetchCart: () => Promise<void>;
  addToCart: (productVariantId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  fetchCart: async () => {
    const response = await fetch('/api/cart');
    const cart = await response.json();
    if (cart) {
      const total = cart.items.reduce((acc: number, item: CartItem) => acc + Number(item.variant.price) * item.quantity, 0);
      set({ items: cart.items, total });
    }
  },
  addToCart: async (productVariantId, quantity) => {
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productVariantId, quantity }),
    });
    // After adding, refetch the cart to update the state
    useCartStore.getState().fetchCart();
  },
  removeFromCart: async (itemId) => {
    await fetch(`/api/cart/items/${itemId}`, {
      method: 'DELETE',
    });
    // After removing, refetch the cart
    useCartStore.getState().fetchCart();
  },
  updateQuantity: async (itemId, quantity) => {
    await fetch(`/api/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    // After updating, refetch the cart
    useCartStore.getState().fetchCart();
  },
  clearCart: async () => {
    await fetch('/api/cart/clear', {
      method: 'DELETE',
    });
    // After clearing, refetch the cart
    useCartStore.getState().fetchCart();
  },
}));
