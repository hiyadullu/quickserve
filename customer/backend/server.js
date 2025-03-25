import express from 'express';
import env from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 4000;
env.config();

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views/pages"));

app.use(express.static(path.join(__dirname, "../frontend")));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.redirect('/customer');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/customer', async (req, res) => {
    try {
        res.render('customer');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Customer server running on port http://localhost:${port}`);
});

