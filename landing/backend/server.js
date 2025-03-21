import express from "express";
import session from "express-session";
import env from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import apiRoutes from "./api/apiRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";

const app = express();
const port = process.env.PORT || 4001;
env.config();

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
app.use("/api", apiRoutes);

app.listen(port, () => {
    console.log(`Admin server running on port http://localhost:${port}`);
});

