import db from "../db.js"; 
import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT * FROM queries"
        );
        res.render("admin_dashboard", { data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/queries", isAuthenticated, async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT * FROM queries"
        );
        res.render("admin_queries", { data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/restaurants", isAuthenticated, async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT * FROM queries"
        );
        res.render("admin_restaurants", { data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Add this to your routes directory (e.g., routes/orders.js)



// Endpoint to update order status
router.post('/update-status', authMiddleware.isAuthenticated, async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    // Validate input
    if (!orderId || !status) {
      return res.status(400).json({ error: 'Order ID and status are required' });
    }
    
    // Validate status value
    const allowedStatuses = ['completed', 'pending', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    // Update the order status in the database
    const result = await db.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, orderId.replace('#', '')]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Return the updated order
    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch dashboard metrics
router.get('/metrics', authMiddleware.isAuthenticated, async (req, res) => {
  try {
    // Get total orders (pending orders count)
    const pendingResult = await db.query(
      'SELECT COUNT(*) FROM orders WHERE status = $1',
      ['pending']
    );
    
    // Get revenue (sum of completed orders)
    const revenueResult = await db.query(
      'SELECT SUM(total) FROM orders WHERE status = $1',
      ['completed']
    );
    
    // Get new restaurants count
    const restaurantsResult = await db.query(
      'SELECT COUNT(*) FROM restaurants WHERE created_at >= NOW() - INTERVAL \'30 days\''
    );
    
    // Calculate growth (comparing current month to previous month)
    const growthResult = await db.query(`
      SELECT 
        (SELECT SUM(total) FROM orders 
         WHERE status = 'completed' AND created_at >= date_trunc('month', current_date))
        /
        NULLIF((SELECT SUM(total) FROM orders 
                WHERE status = 'completed' 
                AND created_at >= date_trunc('month', current_date - interval '1 month')
                AND created_at < date_trunc('month', current_date)), 0) * 100 - 100 as growth
    `);
    
    res.json({
      total_orders: parseInt(pendingResult.rows[0].count),
      revenue: parseFloat(revenueResult.rows[0].sum || 0),
      new_restaurants: parseInt(restaurantsResult.rows[0].count),
      growth: parseFloat(growthResult.rows[0].growth || 0)
    });
    
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

export default router;