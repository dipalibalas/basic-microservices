const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklisttoken');

module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }       

        const blacklisted = await blacklistTokenModel.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }   

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await userModel.findById(decoded.id);  
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }       
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });  

    }
};