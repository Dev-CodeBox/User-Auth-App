const User = require('../models/user.schema');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        } else {
            if (password.length < 6) {
                return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword
                });

                await newUser.save();
                res.status(201).json({ success: true, message: "User registered successfully" });
            }
        }
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
module.exports = registerUser;