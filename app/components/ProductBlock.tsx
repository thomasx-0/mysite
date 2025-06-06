// app/components/ProductBlock.tsx
import React, { useState } from 'react';
import type { Product } from '~/types';

interface ProductBlockProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export default function ProductBlock({ product, onAddToCart }: ProductBlockProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onAddToCart(product.id);

    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match the duration of the animation
  };

  return (
    <div className="border rounded-lg p-[10%] text-left flex flex-col h-full relative overflow-hidden">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-md font-semibold">${product.cost.toFixed(2)}</p>
      <div className="flex-1" />
      <button
        className="bg-lime-200 hover:bg-lime-300 text-black font-bold font-mono text-xs rounded-xl px-4 py-1 border-1 border-black w-full relative overflow-hidden"
        onClick={handleClick}
      >
        Añada
        {isAnimating && (
          <div className="absolute inset-0 bg-lime-500 animate-wave"></div>
        )}
      </button>
    </div>
  );
}