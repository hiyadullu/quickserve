// Auth Middleware
export const isAuthenticated = (req, res, next) => {
    if (!req.session.admin) {
        console.log("Admin not found.");
        return res.redirect('/auth/login');
    }
    next();
};