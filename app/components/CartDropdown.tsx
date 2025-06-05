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

    const handleCheckout = async () => {
        if (!checkoutCode.trim()) {
            setCodeError("Please enter a checkout code.");
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
        }
    };

    return (
        <div className="cart-dropdown-overlay">
            <div className="cart-dropdown">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    {item.name} - ${item.cost.toFixed(2)} x
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                                    />
                                    = ${(item.cost * item.quantity).toFixed(2)}
                                    <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <h3>Total: ${totalCost.toFixed(2)}</h3>
                            <div className="checkout-section">
                                <label htmlFor="checkout-code">Enter Code:</label>
                                <input
                                    type="text"
                                    id="checkout-code"
                                    value={checkoutCode}
                                    onChange={(e) => setCheckoutCode(e.target.value)}
                                    placeholder="Required Code"
                                />
                                {codeError && <p className="error-message">{codeError}</p>}
                                <button onClick={handleCheckout} disabled={isProcessing || cartItems.length === 0}>
                                    {isProcessing ? 'Processing...' : 'Checkout'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}