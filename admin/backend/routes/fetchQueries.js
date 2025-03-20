import db from "../db.js"; 
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM queries");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});