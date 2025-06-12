const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/user.register');
const loginUser = require('../controllers/user.login');
const logoutUser = require('../controllers/user.logout');
const authenticateUser = require('../middlewares/authentication');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', authenticateUser, (req, res) => {
    res.send("Welcome to the protected dashboard!");
});
router.post('/logout', authenticateUser, logoutUser);

module.exports = router;