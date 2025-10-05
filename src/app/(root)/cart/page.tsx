'use client';

import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Trash2, CheckCircle } from 'lucide-react';

export default function CartPage() {
  const { items, total, fetchCart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.variant.images[0]?.url || '/placeholder.svg'}
                      alt={item.variant.product.name}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.variant.product.name}</h2>
                      <p className="text-sm text-gray-500">Men&#39;s Shoes</p>
                      <p className="text-sm text-gray-500">Size: 10</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 border rounded-lg"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">${(item.variant.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          {items.length > 0 && (
            <div className="p-4 border rounded-lg">
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Estimated Delivery & Handling</span>
                <span>$2.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(total + 2).toFixed(2)}</span>
              </div>
              <button
                onClick={() => setShowPopup(true)}
                className="w-full mt-4 bg-black text-white py-2 rounded-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-blue-500" />
            <h2 className="mt-4 text-2xl font-bold">Thank you for your purchase!</h2>
            <button
              onClick={() => {
                setShowPopup(false);
                clearCart();
              }}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
