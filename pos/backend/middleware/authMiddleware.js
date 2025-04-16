// Auth Middleware
export const isAuthenticated = (req, res, next) => {
    if (!req.session.restaurant) {
        return res.redirect('/auth/login');
    }
    next();
};