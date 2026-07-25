
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Email required
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    // Password required
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email"
        });
    }

    // Password minimum length
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }

    // Validation successful
    next();
};

module.exports = validateLogin;

