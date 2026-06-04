const express = require('express');
const router = express.Router();
const { register, login,logout,getProfile } = require('../controllers/user.controller');
const { userAuth } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', userAuth, logout);
router.get('/profile', userAuth, getProfile);
module.exports = router;