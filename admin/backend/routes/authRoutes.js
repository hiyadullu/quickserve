import express from "express";
import db from "../db.js";
import bcrypt from 'bcrypt';

const router = express.Router();

router.get("/login", (req, res) => {
    try {
        res.render("admin_login");
    } catch (error) {
        res.send
    }
});

router.get("/add", (req, res) => {
    try {
        res.render("admin_add");
    } catch (error) {
        res.send
    }
});

router.post("/add", async (req, res) => {
    const admin_id = req.body.admin_id;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if the admin ID already exists
        const existingAdmin = await db.query(
            "SELECT * FROM admin WHERE admin_id = $1",
            [admin_id]
        );

        if (existingAdmin.rows.length > 0) {
            // Admin ID already exists
            res.send("Admin ID already exists. Please use a different ID.");
        } else {
            // Admin ID does not exist, proceed with insertion
            const result = await db.query(
                "INSERT INTO admin (admin_id, password) VALUES ($1, $2) RETURNING *",
                [admin_id, hashedPassword]
            );

            res.redirect("/");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while adding the admin.");
    }
});

router.post("/login", async (req, res) => {
    const admin_id = req.body.admin_id;
    const password = req.body.password;
    console.log(admin_id, password);

    try {
        const result = await db.query(
            "SELECT * FROM admin WHERE admin_id = $1", 
            [admin_id]
        );

        if (result.rows.length > 0) {
            const admin = result.rows[0];

            if (await bcrypt.compare(password, admin.password)) {
                // Store session data
                req.session.admin = {
                    admin_id: admin.admin_id,
                };
                res.redirect("/dashboard");
            } else {
                res.status(401).json({ error: "Incorrect password" });
            }
        } else {
            res.status(404).json({ error: "Admin not found" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "An error occurred during login" });
    }
});

// Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

export default router;