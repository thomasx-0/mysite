// app/components/ProductBlock.tsx
import React from 'react';
import type { Product } from '~/types';

interface ProductBlockProps {
    product: Product;
    onAddToCart: (productId: string) => void;
}

export default function ProductBlock({ product, onAddToCart }: ProductBlockProps) {
    return (
        <div className="flex flex-col items-center border-2 border-dotted border-black rounded-2xl p-2 min-w-[120px] bg-white">
            <h3 className="font-mono text-xs font-bold tracking-widest text-center mb-1">{product.name}</h3>
            <p className="font-mono text-xs text-center mb-1">${product.cost.toFixed(2)}</p>
            <button
                className="bg-lime-400 hover:bg-lime-500 text-black font-bold font-mono text-xs rounded-xl px-4 py-1 mt-1 border-2 border-black"
                onClick={() => onAddToCart(product.id)}
            >
                BUY NOW
            </button>
        </div>
    );
}