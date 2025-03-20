import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import db from "../db.js"; // Import your database connection

export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        console.log("User  not authenticated");
        return res.redirect('/auth/login');
    }
    next();
};

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;

                // Check if user already exists
                const userCheckQuery = "SELECT * FROM restaurants WHERE email = $1";
                const result = await db.query(userCheckQuery, [email]);

                let user;
                if (result.rows.length > 0) {
                    user = result.rows[0]; // Existing user
                } else {
                    console.log("🆕 New user, adding to DB:", email);
                    const insertQuery = `
                        INSERT INTO restaurants (email, password )
                        VALUES ($1, $2, $3) RETURNING *`;
                    const newUser = await db.query(insertQuery, [email, "google"]);
                    user = newUser.rows[0];
                }

                // ✅ Return user details
                return done(null, {
                    id: user.id,
                    email: user.email,
                });

            } catch (error) {
                console.error("🚨 Google Auth Error:", error);
                return done(error, null);
            }
        }
    )
);

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser(async (user, done) => {
    try {
        const result = await db.query("SELECT * FROM restaurants WHERE id = $1", [user.id]);

        if (result.rows.length > 0) {
            return done(null, result.rows[0]);
        }

        return done(null, false);
    } catch (error) {
        console.error("🚨 Error in deserializeUser:", error);
        done(error, null);
    }
});


export default passport;