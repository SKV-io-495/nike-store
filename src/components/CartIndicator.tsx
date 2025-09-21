'use client';

import { useCartStore } from '@/store/cart';
import { useEffect } from 'react';

export function CartIndicator() {
  const { items, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="relative">
      {/* Your Cart Icon SVG or Component */}
      <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {items.length}
      </span>
    </div>
  );
}
