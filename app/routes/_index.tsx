// app/routes/_index.tsx
import { json, type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useState, useEffect } from "react";
import type { Product, CartItem } from "~/types";
import ProductBlock from '~/components/ProductBlock';
import CartDropdown from '~/components/CartDropdown';

export const meta: MetaFunction = () => {
  return [
    { title: "Remix E-commerce" },
    { name: "description", content: "Your awesome Remix E-commerce app!" },
  ];
};

// Server-side loader to fetch products from public/products.json
export const loader: LoaderFunction = async () => {
  const products = await import("../../public/products.json").then(m => m.default) as Product[];
  return json({ products });
};

export default function Index() {
  const { products } = useLoaderData<{ products: Product[] }>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId: string) => {
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === productId);
        if (existingItem) {
          return prevCart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...productToAdd, quantity: 1 }];
        }
      });
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart =>
        prevCart.map(item =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
    );
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-start px-2 py-4">
      <header className="w-full flex flex-col items-start mb-4 p-[5%]">
        <button
          className="self-start mb-2 px-2 py-1 border border-black rounded-full text-xs font-mono tracking-widest hover:bg-gray-100 flex items-center gap-1"
          onClick={toggleCart}
          aria-label="Open cart"
        >
          🛒
          <span className="ml-1">CARRITO</span>
          {cart.length > 0 && (
            <span className="ml-2 bg-black text-white rounded-full px-2 py-0.5 text-xs font-mono">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
        <h1 className="text-2xl font-bold font-mono tracking-widest text-left mb-2">
          S-MUSH TIENDA
        </h1>
      </header>

      {isCartOpen && (
        <CartDropdown
          cartItems={cart}
          onClose={toggleCart}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
          totalCost={calculateTotal()}
          onCheckoutSuccess={() => {
            setCart([]); // Clear cart on successful checkout
            setIsCartOpen(false); // Close cart
          }}
        />
      )}

      <main className="grid grid-cols-2 gap-3 w-full max-w-xs px-[5%] py-[5%]">
        {products.map(product => (
          <ProductBlock
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </main>
    </div>
  );
}