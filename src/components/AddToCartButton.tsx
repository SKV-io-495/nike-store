'use client';

import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

export function AddToCartButton({ productVariantId }: { productVariantId: string }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(productVariantId, 1);
    toast.success('Item added to Cart', {
      style: {
        background: '#000',
        color: '#fff',
        fontWeight: 'bold',
      },
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}
