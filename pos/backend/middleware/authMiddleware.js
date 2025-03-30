const express = require("express");
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating tokens
const { Pool } = require("pg"); // PostgreSQL client

const app = express();
const pool = new Pool({
    user: "your_db_user",
    host: "localhost",
    database: "your_db_name",
    password: "your_db_password",
    port: 5432,
});

app.use(express.json());

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = result.rows[0];

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, "your_secret_key", { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
