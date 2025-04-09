import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js"; // Ensure the file extension is included for ES modules

const router = express.Router();

async function hashPassword(plainPassword) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    // console.log("Hashed Password:", hashedPassword);
    return hashedPassword; // Ensure the hashed password is returned
}

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

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Insert user into database
        const newUser = await db.query(
            "INSERT INTO restaurants (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
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
    console.log(email, password)

    try {
        // Check if user exists
        const userQuery = await db.query("SELECT * FROM restaurants WHERE email = $1", [email]);
        if (userQuery.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = userQuery.rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        res.json({ message: "Login successful" });
    } catch (err) {
        console.error("❌ Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
