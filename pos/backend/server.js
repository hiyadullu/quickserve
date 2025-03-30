import env from "dotenv";
import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Startup log
console.log("🚀 Server script is starting...");

// Enable CORS
app.use(cors());

// If you want to allow only specific origins:
app.use(cors({
    origin: "http://127.0.0.1:5500" // Replace with your frontend's origin
}));

// Middleware
app.use(express.json());
console.log("🟢 Middleware loaded");

// Debugging before requiring authRoutes
console.log("🟡 Before requiring authRoutes");

try {
    console.log("✅ Auth routes loaded successfully");
} catch (error) {
    console.error("❌ Error loading authRoutes:", error);
}

// Root route
app.get("/", (req, res) => {
    console.log("✅ Root route accessed");
    res.send("✅ Server is running!");
});

// Improved Auth route that validates against database
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        
        // Query the database to find the user
        const user = await db.getUserByEmail(email);
        
        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // Check if password matches
        const isPasswordValid = await db.verifyPassword(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // Generate a token
        const token = generateToken(user.id);
        
        // Return the token and user info (excluding password)
        const { password: _, ...userWithoutPassword } = user;
        res.json({ 
            token, 
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "An error occurred during login" });
    }
});

// Function to generate a token
function generateToken(userId) {
    // In a real app, use JWT or another secure token method
    return Buffer.from(userId + '-' + Date.now()).toString('base64');
}

// Start the server
app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});