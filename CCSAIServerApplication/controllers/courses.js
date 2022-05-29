const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
var ObjectId = require('mongoose').Types.ObjectId;

// @desc      Create course
// @route     POST /api/v1/courses/
// @access    Private/Admin
exports.createCourse = asyncHandler(async(req, res, next) => {
    const { courseCode, course } = req.body;
    let courseObj = await Course.create({
        "courseCode": courseCode,
        "course": course
    });

    res.status(200).json({
        success: true,
        data: courseObj
    });

});

// @desc      Update course
// @route     PUT /api/v1/courses/:id
// @access    Private/Admin
exports.updateCourse = asyncHandler(async(req, res, next) => {

    let courseObj = await Course.findById(req.params.id);

    if (!courseObj) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}.`));
    }



    const { courseCode, course } = req.body;
    courseObj = await Course.findByIdAndUpdate(req.params.id, {
        "courseCode": courseCode,
        "course": course
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: courseObj
    });

});

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Private/Admin
exports.getAllCourses = asyncHandler(async(req, res, next) => {
    const courses = await Course.find();

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});

// @desc      Change course status to Deactivated
// @route     PUT /api/v1/courses/deactivate/:id
// @access    Private/Admin/
exports.deactivateCourse = asyncHandler(async(req, res, next) => {

    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }

    if (req.loggedUser.role !== "admin") {

        return next(new ErrorResponse(`Function for admin only`, 404));

    }

    course = await Course.findByIdAndUpdate(req.params.id, { "course_status": "deactivated" }, {
        new: true,
        runValidators: false
    });

    res.status(200).json({
        success: true,
        data: course
    });

});

// @desc      Change course status to Active
// @route     PUT /api/v1/courses/activate/:id
// @access    Private/Admin
exports.activateCourse = asyncHandler(async(req, res, next) => {

    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }

    if (req.loggedUser.role !== "admin") {

        return next(new ErrorResponse(`Function for admin only`, 404));

    }

    course = await Course.findByIdAndUpdate(req.params.id, { "course_status": "active" }, {
        new: true,
        runValidators: false
    });

    res.status(200).json({
        success: true,
        data: course
    });

});

// @desc        Get course by Id
// @route       GET /api/v1/courses/:id
// @access      Private/Admin
exports.getCourseById = asyncHandler(async(req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: course
    });
});