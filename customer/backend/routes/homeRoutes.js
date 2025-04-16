import express from "express";
import db from "../db.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('error', {
        message: 'Page not found'
    })
})

export default router;