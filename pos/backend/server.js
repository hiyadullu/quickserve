import env from "dotenv";
import express from "express";
import db from "./db.js"

const app = express();
const PORT = process.env.PORT || 4000;

// Startup log
console.log("🚀 Server script is starting...");

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

// Start the server
app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT}`
    );
});
