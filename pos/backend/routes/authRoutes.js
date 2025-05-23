import express from "express";
import db from "../db.js"; // Ensure the file extension is included for ES modules

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login')
})
// Register Route
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const userCheck = await db.query(
            "SELECT * FROM restaurants WHERE email = $1", [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: "Restaurant already exists" });
        }
        // Insert user into database
        const newUser = await db.query(
            "INSERT INTO restaurants (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, password]
        );

        res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
    } catch (err) {
        console.error("❌ Registration Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Check if user exists
        const restaurantQuery = await db.query("SELECT * FROM restaurants WHERE email = $1", [email]);
        if (restaurantQuery.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const restaurant = restaurantQuery.rows[0];

        // Compare password directly
        if (password !== restaurant.password) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Update restaurant status to active
        await db.query(
            "UPDATE restaurants SET status = 'active' WHERE email = $1",
            [email]
        );

        // Set session
        req.session.restaurant = {
            id: restaurant.id,
            email: restaurant.email
        };

        console.log(req.session.restaurant)
        res.redirect('/dashboard');

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Logout Route
router.post("/logout", async (req, res) => {
    try {
        // Update restaurant status to inactive
        await db.query(
            "UPDATE restaurants SET status = 'inactive' WHERE email = $1",
            [req.session.restaurant.email]
        );

        req.session.destroy((err) => {
            if (err) {
                console.error("❌ Logout Error:", err);
                res.status(500)
            } else {
                res.status(200)
            }
        });
    } catch (err) {
        console.error("❌ Logout Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
