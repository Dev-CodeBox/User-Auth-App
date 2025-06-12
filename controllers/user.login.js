const User = require('../models/user.schema');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User not found" });
        } else {
            if (password.length < 6) {
                return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
            }
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }
            const token = jwt.sign(
                {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict'
            }).status(200).json({
                success: true,
                message: "Login successful",
            });
        }
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = loginUser;