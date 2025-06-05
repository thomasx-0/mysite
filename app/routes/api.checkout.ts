// app/routes/api.checkout.ts
import { json, type ActionFunction } from "@remix-run/node";
import { createOrder } from "~/db.server";
import type { Order } from "~/types";

// **WARNING: For security, the REQUIRED_CHECKOUT_CODE should ideally be fetched from a secure source (e.g., environment variable)
// or be part of a more robust authentication/coupon system, NOT hardcoded.**
const SERVER_REQUIRED_CHECKOUT_CODE = process.env.CHECKOUT_CODE_SECRET_1;

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== "POST") {
        return json({ message: "Method Not Allowed" }, { status: 405 });
    }

    try {
        const formData = await request.json();
        const { cart, checkoutCode, totalCost } = formData;

        // Server-side validation of checkout code
        if (checkoutCode !== SERVER_REQUIRED_CHECKOUT_CODE) {
            return json({ message: "Invalid checkout code." }, { status: 401 }); // Unauthorized
        }

        if (!cart || !Array.isArray(cart) || cart.length === 0 || typeof totalCost === 'undefined') {
            return json({ message: "Invalid checkout data." }, { status: 400 });
        }

        const order: Order = {
            checkoutCode: checkoutCode,
            items: cart,
            totalCost: totalCost,
        };

        const orderId = await createOrder(order);

        return json({ message: "Order placed successfully!", orderId });
    } catch (error: any) {
        console.error("Server error during checkout:", error);
        return json({ message: "Error processing order.", error: error.message }, { status: 500 });
    }
};