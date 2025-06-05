// app/components/ProductBlock.tsx
import React from 'react';
import type { Product } from '~/types';

interface ProductBlockProps {
    product: Product;
    onAddToCart: (productId: string) => void;
}

export default function ProductBlock({ product, onAddToCart }: { product: Product; onAddToCart: (id: string) => void }) {
  return (
    <div className="border rounded-lg p-[10%] text-left">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-md font-semibold">${product.cost.toFixed(2)}</p>
      <button
        className="bg-lime-400 hover:bg-lime-500 text-black font-bold font-mono text-xs rounded-xl px-4 py-1 border-2 border-black w-full"
        onClick={() => onAddToCart(product.id)}
      >
        Buy Now
      </button>
    </div>
  );
}