import { Pool } from "pg";
import env from "dotenv";

env.config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false, // Use this for cloud-hosted databases that require SSL
    },
});

// Function to get a user by email
export const getUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

// Function to verify password
export const verifyPassword = async (enteredPassword, storedPassword) => {
    const bcrypt = await import("bcryptjs");
    return bcrypt.compare(enteredPassword, storedPassword);
};

// Export the pool and the functions
export { pool };
