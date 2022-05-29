const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorReponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.protectUser = asyncHandler(async(req, res, next) => {
    let token;


    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorReponse('Not authorize to access this route', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.loggedUser = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorReponse('Not authorize to access this route', 401));
    }
});


exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.loggedUser.role)) {
            return next(
                new ErrorReponse(
                    `User role ${req.loggedUser.role} is not authorized to access this route`,
                    403
                )
            );
        }

        next();
    }
}