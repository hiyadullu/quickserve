import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await db.query(
            `SELECT * FROM users;`
        )
        console.log(users.rows);
        res.render("home");
        
    } catch (error) {
        res.send(error);
    }
});

export default router;
