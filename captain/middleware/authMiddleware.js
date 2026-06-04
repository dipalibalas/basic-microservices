const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklisttoken');

module.exports.captainAuth = async (req, res, next) => {
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
        const captain = await captainModel.findById(decoded.id);  
        if (!captain) {
            return res.status(401).json({ message: 'Captain not found' });
        }       
        req.captain = captain;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });  

    }
};

