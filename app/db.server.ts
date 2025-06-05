// app/db.server.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';
import type { Order } from './types';

dotenv.config(); // Load environment variables

if (!process.env.NEON_DATABASE_URL) {
    throw new Error("NEON_DATABASE_URL environment variable is not set.");
}

const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Neon if using older node versions, or if not setting up certs
    },
});

export async function createOrder(order: Order) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `INSERT INTO orders (checkout_code, items, total_cost)
       VALUES ($1, $2, $3) RETURNING id`,
            [order.checkoutCode, JSON.stringify(order.items), order.totalCost]
        );
        return result.rows[0].id as string;
    } finally {
        client.release();
    }
}