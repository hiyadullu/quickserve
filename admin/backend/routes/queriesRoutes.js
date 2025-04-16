import db from "../db.js"; 
import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT * FROM queries"
        );
        res.render("admin_queries", { data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/update-status", isAuthenticated, async (req, res) => {
    const { queryId, status } = req.body;
    try {
        await db.query(
            "UPDATE queries SET status = $1 WHERE id = $2",
            [status, queryId]
        );
        res.redirect("/queries");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;