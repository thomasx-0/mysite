// app/components/ProductBlock.tsx
import React from 'react';
import type { Product } from '~/types';

interface ProductBlockProps {
    product: Product;
    onAddToCart: (productId: string) => void;
}

export default function ProductBlock({ product, onAddToCart }: ProductBlockProps) {
  return (
    <div className="border rounded-lg p-[10%] text-left flex flex-col h-full">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-md font-semibold">${product.cost.toFixed(2)}</p>
      <div className="flex-1" />
      <button
        className="bg-lime-400 hover:bg-lime-500 text-black font-bold font-mono text-xs rounded-xl px-4 py-1 border-2 border-black w-full mt-4"
        onClick={() => onAddToCart(product.id)}
      >
        Añada
      </button>
    </div>
  );
}