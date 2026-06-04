const express = require('express');
const router = express.Router();
const { register, login,logout,getProfile, toggleAvailability } = require('../controllers/captain.controller');
const { captainAuth } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', captainAuth, logout);
router.get('/profile', captainAuth, getProfile);
router.patch('/toggle-availability', captainAuth, toggleAvailability);

module.exports = router;