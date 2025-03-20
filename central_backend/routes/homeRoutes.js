import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const restaurants = await db.query(
            `SELECT * FROM restaurants;`
        )
        console.log(restaurants.rows);
        res.render("home");
        
    } catch (error) {
        res.send(error);
    }
});

export default router;
