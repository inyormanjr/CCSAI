const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;


//  @desc   create user 
//  @route  POST /api/v1/users/register
//  @access Private
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

//  @desc   update user password
//  @route  PUT /api/v1/users/updateuserpassword
//  @access Private
exports.changeUserPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.loggedUser.id).select('+password');
    console.log(user);
    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendUserTokenResponse(user, 200, res);
});

//  @desc   update user password
//  @route  PUT /api/v1/users/updateuserpassword/:id
//  @access Private/Admin
exports.changeUserPasswordAdmin = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}.`));
    }

    if (req.loggedUser.role !== "admin") {

        return next(new ErrorResponse(`User not admin`, 404));

    }

    user.password = req.body.newPassword;
    await user.save();

    sendUserTokenResponse(user, 200, res);
});

// @desc    Update user details
// @route   PUT /api/v1/users/updateuser/:id
// @access  Private/Admin
exports.updateUserById = asyncHandler(async(req, res, next) => {

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}.`));
    }

    var fullName = `${req.body.firstName.toLowerCase()} ${req.body.lastName.toLowerCase()}`;

    user = await User.findByIdAndUpdate(req.params.id, {
        "firstName": req.body.firstName.toLowerCase(),
        "lastName": req.body.lastName.toLowerCase(),
        "role": req.body.role,
        fullName
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });

});
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async(req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

// @desc      Change user status to Deactivated
// @route     PUT /api/v1/users/deactivate/:id
// @access    Private/Admin/
exports.deactivateUser = asyncHandler(async(req, res, next) => {

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    if (req.loggedUser.role !== "admin") {

        return next(new ErrorResponse(`Function for admin only`, 404));

    }

    user = await User.findByIdAndUpdate(req.params.id, { "user_status": "deactivated" }, {
        new: true,
        runValidators: false
    });

    res.status(200).json({
        success: true,
        data: user
    });

});

// @desc      Change user status to Active
// @route     PUT /api/v1/users/activate/:id
// @access    Private/Admin
exports.activateUser = asyncHandler(async(req, res, next) => {

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    if (req.loggedUser.role !== "admin") {
        return next(new ErrorResponse(`Function for admin only`, 404));
    }

    user = await User.findByIdAndUpdate(req.params.id, { "user_status": "active" }, {
        new: true,
        runValidators: false
    });

    res.status(200).json({
        success: true,
        data: user
    });

});

// @desc        Get user by Id
// @route       GET /api/v1/users/:id
// @access      Private/Admin
exports.getUserById = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found.`, 404));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

const sendUserTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    res
        .status(statusCode)
        .json({
            success: true,
            userToken: token
        });
}