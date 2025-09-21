'use client';

import { useCartStore } from '@/store/cart';

export function AddToCartButton({ productVariantId }: { productVariantId: string }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(productVariantId, 1)}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}
