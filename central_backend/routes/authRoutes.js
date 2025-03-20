import express from "express";
import db from "../db.js";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();
const router = express.Router();

// Google Login Route
router.get(
    "/google", 
    passport.authenticate("google", { 
    scope: ["profile", "email"] 
}));

router.get(
    "/google/proceed",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
    })
);

// Google Callback Route
router.get(
    "/google/callback",
    passport.authenticate("google", { 
        failureRedirect: "/auth/login" 
    }),
    (req, res) => {
        if (req.user) {
            req.session.user = {
              id: req.user.id,
              email: req.user.email,
              is_paid: req.user.is_paid || 0,
              isAdmin: req.user.isAdmin || false
            };
            console.log("✅ User session set:", req.session.user); // Check if session is stored
            req.session.save((err) => {
                if (err) {
                    console.error("🚨 Error saving session:", err);
                    return res.redirect("/auth/login");
                }
                 // ✅ Redirect based on admin status
                 return req.session.user.isAdmin ? res.redirect("/admin") : res.redirect("/");
          });
        } else {
            res.redirect("/auth/login");
          }
        }
);

export default router;