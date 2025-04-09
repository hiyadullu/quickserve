import express from "express";
import session from "express-session";
import env from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import homeRoutes from "./routes/homeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
const port = process.env.PORT || 4004;
env.config();

// Initialize express-session
app.use(session({
    secret: process.env.SESSION_SECRET_KEY, // Replace with a strong, random string
    resave: false, // Prevents session from being saved repeatedly when unmodified
    saveUninitialized: false, // Avoids storing empty sessions
    cookie: {
        secure: false, // Set to `true` if using HTTPS
        httpOnly: true, // Prevents client-side JavaScript access
        maxAge: 1000 * 60 * 60 * 24// Session expires in 1 hour
    }
}));

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views/pages")); // Point to the views folder in the frontend directory

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Use home routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
    console.log(`Admin server running on port http://localhost:${port}`);
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
