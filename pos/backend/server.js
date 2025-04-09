import dotenv from "dotenv"; // Fixed import
import express from "express";
import cors from "cors";
import pool, { getUserByEmail, verifyPassword } from "./db.js"; // Import `pool`

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

console.log("🚀 Server script is starting...");

app.use(cors());
app.use(express.json());

console.log("🟢 Middleware loaded");

// Root route
app.get("/", (req, res) => {
    console.log("✅ Root route accessed");
    res.send("✅ Server is running!");
});
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

// Register a new user (signup route)
app.post("/auth/register", async (req, res) => {
    console.log("Received registration request:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Hash the password before storing it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store the hashed password in the database
        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );

        console.log("✅ User registered:", result.rows[0]);
        res.json({ message: "User registered successfully", user: result.rows[0] });
    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Auth route
app.post("/auth/login", async (req, res) => {
    console.log("Received login request:", req.body); // Log the request body
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        res.json({ message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 POS server running on port http://localhost:${PORT}`);
});
