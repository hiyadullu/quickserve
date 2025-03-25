import express from "express";
import db from "../db.js"; // Assuming you have a database connection file

const router = express.Router();

router.post("/request-demo", async (req, res) => {
    const { name, phone, email } = req.body;

    try {
        // Insert the data into the queries table
        const query = `
            INSERT INTO queries (name, contact_number, email_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [name, phone, email];

        const result = await db.query(query, values);

        // Log the inserted data
        console.log("Inserted Data:", result.rows[0]);

        res.status(200).send({ message: "Request demo submitted successfully!" });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send({ message: "An error occurred while processing your request." });
    }
});

export default router;