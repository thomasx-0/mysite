// app/components/CartDropdown.tsx
import React, { useState } from 'react';
import type { CartItem } from '~/types';

interface CartDropdownProps {
    cartItems: CartItem[];
    onClose: () => void;
    onRemoveItem: (productId: string) => void;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    totalCost: number;
    onCheckoutSuccess: () => void;
}

export default function CartDropdown({
  cartItems,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  totalCost,
  onCheckoutSuccess,
}: CartDropdownProps) {
  const [checkoutCode, setCheckoutCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCheckout = async () => {
    setIsAnimating(true);

    if (!checkoutCode.trim()) {
      setCodeError("Introduzca el código de entrenador");
      setTimeout(() => setIsAnimating(false), 500);
      return;
    }

    setCodeError("");
    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            cost: item.cost,
            quantity: item.quantity,
          })),
          checkoutCode: checkoutCode,
          totalCost: totalCost,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Checkout successful! Order ID: ${result.orderId}`);
        onCheckoutSuccess();
      } else {
        const errorData = await response.json();
        setCodeError(errorData.message || "Checkout failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setCodeError("An unexpected error occurred during checkout.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="absolute bg-white border-2 border-slate-200 rounded-2xl p-4 w-full max-w-xs mx-auto flex flex-col items-center z-50">
      <button className="self-end text-2xl font-bold mb-2" onClick={onClose}>
        &times;
      </button>
      <h2 className="font-mono text-lg font-bold mb-2">Su Cesta</h2>
      {cartItems.length === 0 ? (
        <p className="font-mono text-sm">Su Cesta Está Vacía</p>
      ) : (
        <>
          <ul className="w-full mb-2">
            {cartItems.map(item => (
              <li
                key={item.id}
                className="flex items-center justify-between mb-2 border-b border-dotted border-gray-300 pb-1"
              >
                <span className="font-mono text-xs">{item.name}</span>
                <span className="font-mono text-xs">
                  Modificar Importe
                  <input
                    type="number"
                    min="1"
                    className="w-10 mx-1 border border-black rounded text-center"
                    onChange={e => onUpdateQuantity(item.id, parseInt(e.target.value))}
                  />
                </span>
                <button
                  className="bg-lime-100 text-lime-600 font-mono text-xs rounded-full px-2 py-1 ml-2"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
          <div className="w-full flex flex-col items-center">
            <h3 className="font-mono text-base font-bold mb-2">Total: ${totalCost.toFixed(2)}</h3>
            <div className="w-full flex flex-col items-center">
              <label htmlFor="checkout-code" className="font-mono text-xs mb-1">
                Introducir Código:
              </label>
              <input
                type="text"
                id="checkout-code"
                className="border border-black rounded px-2 py-1 mb-1 w-full font-mono text-xs"
                value={checkoutCode}
                onChange={e => setCheckoutCode(e.target.value)}
                placeholder="Código de entrenador"
              />
              {codeError && <p className="text-lime-400 text-xs mb-1">{codeError}</p>}
              <button
                className="bg-lime-200 hover:bg-lime-300 text-black font-bold font-mono text-xs rounded-xl px-4 py-1 border-1 border-black w-full relative overflow-hidden"
                onClick={handleCheckout}
                disabled={isProcessing || cartItems.length === 0}
              >
                {isProcessing ? "Procesando..." : "Pedido"}
                {isAnimating && (
                  <div className="absolute inset-0 bg-lime-300 animate-wave"></div>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}