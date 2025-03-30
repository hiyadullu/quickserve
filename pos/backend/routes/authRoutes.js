import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js"; // Add .js extension
import authMiddleware from "../middleware/authMiddleware.js"; // Add .js extension


const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
    } catch (err) {
        console.error("❌ Registration Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userQuery.rows.length === 0) {
            console.log("❌ User not found in DB");
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = userQuery.rows[0];

        console.log("✅ User found:", user.email);

        // Debugging: Log stored password
        console.log("Stored hashed password:", user.password);
        console.log("Entered password:", password);

        // Hash entered password before comparing (for debugging only)
        const hashedEnteredPassword = await bcrypt.hash(password, 10);
        console.log("Hashed entered password (for debugging):", hashedEnteredPassword);

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            console.log("❌ Password does not match");
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error("❌ Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
