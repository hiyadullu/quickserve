import db from "../db.js"; 
import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT * FROM queries"
        );
        res.render("admin_dashboard", { data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/queries", isAuthenticated, async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT * FROM queries"
        );
        res.render("admin_queries", { data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/restaurants", isAuthenticated, async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT * FROM queries"
        );
        res.render("admin_restaurants", { data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;