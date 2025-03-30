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

// Auth route
app.post("/auth/login", (req, res) => {
    // Your login logic here
    res.json({ token: "example-token" });
});

// Start the server
app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT}`
    );
});
