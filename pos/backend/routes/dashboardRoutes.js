import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import db from "../db.js";

const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
    const restaurantId = req.session.restaurant.id;
    
    try {
        const ordersQuery = await db.query(
            `SELECT o.order_id, o.order_status, o.order_time, o.total_amount, o.table_number, o.payment_method,
                    json_agg(json_build_object(
                        'name', m.name,
                        'quantity', oi.quantity,
                        'price', m.price,
                        'item_total', (oi.quantity * m.price)
                    )) as items
             FROM orders o
             JOIN order_items oi ON o.order_id = oi.order_id
             JOIN menu_items m ON oi.menu_item_id = m.id
             WHERE o.restaurant_id = $1
             GROUP BY o.order_id, o.order_status, o.order_time, o.total_amount, o.table_number, o.payment_method
             ORDER BY o.order_time DESC`,
            [restaurantId]
        );

        const orders = ordersQuery.rows.map(order => ({
            ...order,
            created_at: new Date(order.created_at).toLocaleString(),
            items: order.items
        }));

        res.render('dashboard', { 
            currentPage: 'dashboard',
            orders: orders
        });
    } catch (err) {
        console.error("❌ Error fetching orders:", err);
        res.status(500).json({ message: "Server error" });
    }
})

router.post('/update-status', isAuthenticated, async (req, res) => {
    const { order_id, status, current_status } = req.body;
    
    try {
        const updateQuery = await db.query(
            `UPDATE orders 
             SET order_status = $1 
             WHERE order_id = $2 AND order_status = $3`,
            [status, order_id, current_status]
        );

        if (updateQuery.rowCount === 0) {
            return res.status(400).json({ 
                message: "Order not found or status mismatch" 
            });
        }

        res.status(200).json({ message: "Status updated successfully" });
    } catch (err) {
        console.error("❌ Error updating order status:", err);
        res.status(500).json({ message: "Server error" });
    }
})

router.get('/tables', isAuthenticated, async (req, res) => {
    const restaurantId = req.session.restaurant.id;
    console.log(restaurantId);
    
    try {
        const tablesQuery = await db.query(
            "SELECT * FROM restaurants_table WHERE restaurant_id = $1",
            [restaurantId]
        );

        console.log(tablesQuery.rows);
        
        res.render('tables', { tables: tablesQuery.rows, currentPage: 'tables' });
    } catch (err) {
        console.error("❌ Error fetching tables:", err);
        res.status(500).json({ message: "Server error" });
    }
})

router.get('/history', isAuthenticated, (req, res) => {
    res.render('history', { currentPage: 'history' })
})

router.get('/declined', isAuthenticated, (req, res) => {
    res.render('declined', { currentPage: 'declined' })
})

router.get('/settings', isAuthenticated, (req, res) => {
    res.render('settings', { currentPage: 'settings' })
})

export default router;