const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');


// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    if (user.user_status !== "active") {
        return next(new ErrorResponse(`User is not an active account.`, 401));
    }

    sendUserTokenResponse(user, 200, res);

});

// @desc      Register User
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async(req, res, next) => {
    const { firstName, lastName, email, role, password } = req.body;


    let fullName = `${firstName} ${lastName}`;

    let user = await User.create({
        "firstName": firstName.toLowerCase(),
        "lastName": lastName.toLowerCase(),
        fullName,
        email,
        password,
        role,
    });

    res.status(200).json({
        success: true,
        data: user
    });

});

// @desc      Get current logged user
// @route     GET /api/v1/auth/authuser
// @access    Private
exports.authUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.loggedUser._id);
    if (!user) {
        return next(new ErrorResponse('Invalid authentication', 401));
    }
    res.status(200).json({
        success: true,
        data: user
    })
});

const sendUserTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    res
        .status(statusCode)
        .json({
            success: true,
            token
        });
}