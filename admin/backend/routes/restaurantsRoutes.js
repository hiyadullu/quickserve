import db from "../db.js";
import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { generateQRCode } from '../utils/qrGenerator.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {sendManualEmail} from '../utils/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT * FROM restaurants"
        );
        res.render("admin_restaurants", { data: rows });    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/add", isAuthenticated, async (req, res) => {
    res.render("admin_add_restaurant");
});

router.post("/add", isAuthenticated, async (req, res) => {
    const { name, location, email, phone, password, confirmPassword, tableCount } = req.body;
    console.log("Received data:", { name, location, email, phone, password, confirmPassword, tableCount });
    
    // Validate passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        // Insert restaurant and get the ID
        const result = await db.query(
            "INSERT INTO restaurants (name, location, email, phone, password, status) VALUES ($1, $2, $3, $4, $5, 'inactive') RETURNING id, name",
            [name, location, email, phone, password]
        );
        
        const restaurant = result.rows[0];
        console.log('Restaurant created:', restaurant);
        
        try {
            // Generate QR code
            const baseUrl = process.env.CUSTOMER_URL || 'http://localhost:4001';
            // console.log('Using base URL:', baseUrl);
            const qrResult = await generateQRCode(restaurant.id, restaurant.name, baseUrl);
            // console.log('QR code generation result:', qrResult);

            // Create restaurant page on customer website
            const customerUrl = process.env.CUSTOMER_URL || 'http://localhost:4001';
            const createPageResponse = await fetch(`${customerUrl}/createPage/${restaurant.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restaurantId: restaurant.id
                })
            });

            if (!createPageResponse.ok) {
                throw new Error(`Failed to create restaurant page: ${createPageResponse.statusText}`);
            }
            console.log('Restaurant page created successfully');
        } catch (error) {
            console.error('Error in post-creation tasks:', error);
            // Continue with the redirect even if QR generation or page creation fails
        }
        
        res.redirect("/restaurants");
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
    
    // Get the QR code path
    const restaurant = rows[0];
    const folderName = `${restaurant.id}-${restaurant.name.replace(/\s+/g, '-').toLowerCase()}`;
    const qrPath = path.join(__dirname, '../qr-codes', folderName, 'table-qr.png');
    
    // Check if QR code exists
    if (fs.existsSync(qrPath)) {
        // Convert QR code to base64
        const qrImage = fs.readFileSync(qrPath);
        const base64Image = qrImage.toString('base64');
        const qrDataUrl = `data:image/png;base64,${base64Image}`;
        
        res.render("admin_restaurant_info", { 
            restaurant: restaurant,
            qrDataUrl: qrDataUrl
        });
    } else {
        res.render("admin_restaurant_info", { 
            restaurant: restaurant,
            qrDataUrl: null
        });
    }
});

router.post('/send-email', async (req, res) => {
    const { restaurantId } = req.body;
    const result = await db.query("SELECT id, email, name, password FROM restaurants WHERE id = $1", [restaurantId]);
    const restaurant = result.rows[0];
    
    try {
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const emailSent = await sendManualEmail(restaurant);
        if (emailSent) {
            res.status(200).json({ message: 'Email sent successfully' });
        } else {
            res.status(500).json({ message: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Error in send-email route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;