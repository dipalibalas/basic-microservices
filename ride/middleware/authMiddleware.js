const json = require('jsonwebtoken');
const axios = require('axios');

module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }       
        const decoded = json.verify(token, process.env.JWT_SECRET);
     
        // Fetch user details from user service
        const response = await axios.get(`${process.env.BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
       const user = response.data;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;

        next();
    }   
    catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }   
};

module.exports.captainAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }       
        const decoded = json.verify(token, process.env.JWT_SECRET);
       
        // Fetch user details from user service
        const response = await axios.get(`${process.env.BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const captain = response.data;   
        
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }   
        req.captain = captain;
        next();
    }   
    catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: 'Unauthorized' });
    }
};