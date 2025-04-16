import express from "express";
import db from "../db.js";

const router = express.Router();

router.get('/:restaurantId', async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const isQRCode = req.query.qrCode === 'true';
    
    // Fetch restaurant details
    const restaurantResult = await db.query(
        'SELECT * FROM restaurants WHERE id = $1',
        [restaurantId]
    );

    if (restaurantResult.rows.length === 0) {
        return res.status(404).render('error', {
            message: 'Restaurant not found'
        });
    }

    const restaurant = restaurantResult.rows[0];
    
    // If accessed via QR code, increment QR views
    if (isQRCode) {
        await db.query(
            'UPDATE restaurants SET qr_views = COALESCE(qr_views, 0) + 1 WHERE id = $1',
            [restaurantId]
        );
    }

    // Fetch menu items from database
    const menuItems = await db.query(
        'SELECT * FROM menu_items WHERE restaurant_id = $1',
        [restaurantId]
    );

    res.render(`${restaurantId}-customer-landing`, {
        restaurantId: restaurantId,
        restaurant: restaurant,
        menuItems: menuItems.rows
    });
});

router.post('/:restaurantId/payment', async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const { restaurantName, tableNumber, items, total } = req.body;

    // Validate the data
    if (!restaurantName || !tableNumber || !items || !total) {
        return res.status(400).json({ error: 'Missing required order data' });
    }

    // Parse the items if it's a string (from form submission)
    const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;

    // Fetch restaurant details to verify
    const restaurantResult = await db.query(
        'SELECT * FROM restaurants WHERE id = $1',
        [restaurantId]
    );

    if (restaurantResult.rows.length === 0) {
        return res.status(404).render('error', {
            message: 'Restaurant not found'
        });
    }

    // Render the payment page with the order data
    res.render('paymentPage', {
        restaurantId,
        restaurantName,
        tableNumber,
        items: parsedItems,
        total: parseFloat(total)
    });
});

router.get('/:restaurantId/payment', (req, res) => {
    // Redirect to the restaurant page if trying to access payment page directly
    res.redirect(`/${req.params.restaurantId}`);
});

export default router;