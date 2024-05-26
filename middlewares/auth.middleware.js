const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {logger} = require('../config/logger.config')

async function authenticate(req,res,next) {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        logger.error(err);
        return res.status(401).json({ message: 'Not authorized' });
    } 
}
module.exports = { authenticate }