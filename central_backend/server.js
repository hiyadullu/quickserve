import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import session from "express-session";
import passport from "./middleware/authMiddleware.js";

// Import Routes
import homeRoutes from "./routes/homeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
env.config();

app.use('/qrcodes', express.static(path.join(__dirname, 'public/qrcodes')));
const qrRoutes = require('./routes/qrRoutes');
app.use('/api/qr', qrRoutes);


app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    secure: false,  // ❗ Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 1 day session
}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");
app.use(express.json());

// Route Middleware
app.use("/", homeRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
