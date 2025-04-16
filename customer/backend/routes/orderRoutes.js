import express from "express";
import db from "../db.js";
import { generateReceipt } from "../utils/generateReceipt.js";

const router = express.Router();

router.post("/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const name = "farooque";
        const email = `farooque@gmail.com`;
        const paymentId = 1234567890;
        const amount = 100;

        try {
            const receiptPath = await generateReceipt(name, email, amount, paymentId);
            console.log(receiptPath);
          } catch (err) {
            console.error('Receipt generation error:', err);
            res.status(500).json({ success: false, message: 'Failed to generate receipt' });
          }

        const { items, total, tableNumber, paymentMethod, specialInstructions } = req.body;
        console.log(req.body);

        // Insert into orders table
        const orderQuery = `
            INSERT INTO orders (table_number, order_status, special_instructions, total_amount, restaurant_id, payment_method)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING order_id
        `;
        
        const orderResult = await db.query(orderQuery, [
            tableNumber,
            'pending',
            specialInstructions,
            total,
            restaurantId,
            paymentMethod
        ]);

        const orderId = orderResult.rows[0].order_id;

        // Insert into order_items table
        for (const item of items) {
            // First fetch the menu_item_id based on the item name
            const menuItemQuery = `
                SELECT id FROM menu_items 
                WHERE name = $1 AND restaurant_id = $2
            `;
            
            const menuItemResult = await db.query(menuItemQuery, [
                item.name,
                restaurantId
            ]);

            if (menuItemResult.rows.length === 0) {
                throw new Error(`Menu item not found: ${item.name}`);
            }

            const menuItemId = menuItemResult.rows[0].id;

            // Then insert into order_items
            const itemQuery = `
                INSERT INTO order_items (order_id, menu_item_id, quantity)
                VALUES ($1, $2, $3)
            `;
            
            await db.query(itemQuery, [
                orderId,
                menuItemId,
                item.quantity
            ]);
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            orderId: orderId
        });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process order'
        });
    }
});

export default router;
