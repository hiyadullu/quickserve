import express from "express";
import session from "express-session";
import env from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import homeRoutes from "./routes/homeRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import createPageRoutes from "./routes/createPageRoutes.js";

const app = express();
const port = process.env.PORT || 4001;
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
app.use("/customer", customerRoutes);
app.use("/orders", orderRoutes);
app.use("/createPage", createPageRoutes);

app.listen(port, () => {
    console.log(`Customer server running on port http://localhost:${port}`);
});

