require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

// Startup log
console.log("🚀 Server script is starting...");

// Middleware
app.use(cors());
app.use(express.json());
console.log("🟢 Middleware loaded");

// Debugging before requiring authRoutes
console.log("🟡 Before requiring authRoutes");

try {
    const authRoutes = require("./routes/authRoutes");
    app.use("/auth", authRoutes);
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
    console.log(`🚀 Server running on port ${PORT}`);
});
