import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";


dotenv.config();

const { Pool } = pkg;

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

// Debug: Check if the database is connected
pool.query("SELECT 1")
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => console.error("❌ Database connection error:", err));

// // Function to get a user by email
// export const getUserByEmail = async (email) => {
//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     return result.rows[0];
// };

// // Function to verify password
// export const verifyPassword = async (enteredPassword, storedPassword) => {
//     const bcrypt = await import("bcryptjs");
//     return bcrypt.compare(enteredPassword, storedPassword);
// };
// Function to get a user by email
export const getUserByEmail = async (email) => {
    try {
        console.log(`🔍 Fetching user with email: ${email}`);
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (result.rows.length === 0) {
            console.log("❌ No user found with this email");
            return null;
        }

        console.log("✅ User found:", result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error fetching user by email:", error);
        throw error;
    }
};

// Function to verify password
export const verifyPassword = async (enteredPassword, storedPassword) => {
    try {
        const bcrypt = await import("bcryptjs");
        const isMatch = await bcrypt.compare(enteredPassword, storedPassword);

        console.log("🔑 Password match result:", isMatch);
        return isMatch;
    } catch (error) {
        console.error("❌ Error verifying password:", error);
        throw error;
    }
};
const hashExistingPasswords = async () => {
    try {
        // Fetch all users
        const users = await pool.query("SELECT id, email, password FROM users");

        for (const user of users.rows) {
            if (!user.password.startsWith("$2a$")) { // Check if it's already hashed
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await pool.query(
                    "UPDATE users SET password = $1 WHERE id = $2",
                    [hashedPassword, user.id]
                );
                console.log(`✅ Hashed password for user: ${user.email}`);
            }
        }

        console.log("🚀 All passwords hashed successfully!");
    } catch (error) {
        console.error("❌ Error hashing passwords:", error);
    }
};

hashExistingPasswords();

// Export the pool and the functions
// db.connect();
//export default db;
export default pool;