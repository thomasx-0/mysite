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
      setIsCartOpen(true); // Open cart when item is added
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
      <div className="container">
        <header className="header">
          <h1>Our Awesome Store</h1>
          <button className="cart-toggle-btn" onClick={toggleCart}>
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
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

        <main className="product-grid">
          {products.map(product => (
              <ProductBlock key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </main>
      </div>
  );
}