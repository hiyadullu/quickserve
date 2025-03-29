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
        res.render('customer');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/orders", async (req, res) => {
    const { orderData } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO orders (items, total, status) VALUES ($1, $2, $3) RETURNING id",
            [JSON.stringify(items), total, "pending"]
        );

        res.json({ success: true, orderId: result.rows[0].id });
    } catch (err) {
        console.error("Order save error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/process-payment", async (req, res) => {
    const { orderId } = req.query;

    // Example: Redirect to Razorpay
    res.redirect(`https://payment-gateway.com/pay?orderId=${orderId}`);
});

app.listen(port, () => {
    console.log(`Customer server running on port http://localhost:${port}`);
});

