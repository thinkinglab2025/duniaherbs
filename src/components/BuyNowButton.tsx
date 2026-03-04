'use client';

import { useCart } from '@/lib/cart';

type Props = {
  productId: string;
  productName: string;
  price: string;
  image?: string;
};

export default function BuyNowButton({ productId, productName, price, image }: Props) {
  const { addItem } = useCart();

  const priceNum = parseFloat(price.replace(/[^0-9.]/g, ''));

  function handleBuyNow() {
    addItem({ id: productId, name: productName, price, priceNum, image }, 1);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openCart', { detail: { directCheckout: true } }));
    }
  }

  return (
    <button
      onClick={handleBuyNow}
      className="inline-flex items-center gap-2 rounded-xl border border-herb-gold/50 px-6 py-3 text-sm font-medium text-herb-gold transition hover:bg-herb-gold/10 hover:border-herb-gold"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Beli Sekarang
    </button>
  );
}
