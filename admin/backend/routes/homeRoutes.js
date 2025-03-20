import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    try {
        if (req.session.admin) {
            res.redirect("/dashboard");
        } else {
            res.render("admin_login");
        }
    } catch (error) {
        res.send(error);
    }
});

export default router;
