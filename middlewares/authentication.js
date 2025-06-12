const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication token is missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}

module.exports = authenticateUser;