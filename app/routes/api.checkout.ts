// app/routes/api.checkout.ts// app/routes/api.checkout.ts
import {json, type ActionFunction} from "@remix-run/node";
import {createOrder} from "~/db.server";
import type {Order} from "~/types";

// Get all environment variable keys
const envKeys = Object.keys(process.env);

// Filter for keys starting with "TRAINER" and get their values
const VALID_TRAINER_CODES: string[] = envKeys
    .filter(key => key.startsWith("TRAINER_"))
    .map(key => process.env[key])
    .filter((value): value is string => typeof value === 'string'); // Ensure values are strings and not undefined

if (VALID_TRAINER_CODES.length === 0) {
    console.warn("WARNING: No TRAINER_ checkout codes found in environment variables.");
}

export const action: ActionFunction = async ({request}) => {
    if (request.method !== "POST") {
        return json({message: "Method Not Allowed"}, {status: 405});
    }

    try {
        const formData = await request.json();
        const {cart, checkoutCode, totalCost} = formData;

        // Server-side validation of checkout code
        // Check if the provided checkoutCode is one of the valid TRAINER codes
        if (VALID_TRAINER_CODES.includes(checkoutCode)) {
            if (!cart || !Array.isArray(cart) || cart.length === 0 || typeof totalCost === 'undefined') {
                return json({message: "Invalid checkout data."}, {status: 400});
            }
            const order: Order = {
                checkoutCode: checkoutCode, // Store the code that was used
                items: cart,
                totalCost: totalCost,
            };
            const orderId = await createOrder(order);
            return json({message: "Order placed successfully!", orderId});
        } else {
            return json({message: "Invalid checkout code."}, {status: 401}); // Unauthorized
        }
    } catch (error: any) {
        console.error("Server error during checkout:", error);
        return json({message: "Error processing order.", error: error.message}, {status: 500});
    }
};