require('dotenv').config();
console.log("Database Password:", process.env.PG_PASSWORD);

const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: "Database connected!", time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
process.env.PG_PASSWORD = "your_actual_password_here";
console.log("Database Password:", process.env.PG_PASSWORD);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

