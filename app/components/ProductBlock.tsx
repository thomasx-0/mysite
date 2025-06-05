// app/components/ProductBlock.tsx
import React from 'react';
import type { Product } from '~/types';

interface ProductBlockProps {
    product: Product;
    onAddToCart: (productId: string) => void;
}

export default function ProductBlock({ product, onAddToCart }: ProductBlockProps) {
    return (
        <div className="product-block">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <p>Cost: ${product.cost.toFixed(2)}</p>
            <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
        </div>
    );
}