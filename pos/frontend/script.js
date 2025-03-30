// require("dotenv").config();
// const express = require("express");
// const { Pool } = require("pg");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // PostgreSQL Connection
// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { Pool } = require("pg");

// Initialize Express App
const app = express();

// PostgreSQL Connection
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors({
    origin: "http://127.0.0.1:5500", // Allow requests from frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

// Routes
app.use("/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

