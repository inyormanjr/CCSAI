const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Enrollment = require('../models/Enrollment');
var ObjectId = require('mongoose').Types.ObjectId;

// @desc      Create Enrollment
// @route     POST /api/v1/enrollment/
// @access    Private/Admin
exports.createEnrollment = asyncHandler(async(req, res, next) => {
    const { enrollmentDate, courseId, termId, instructorId } = req.body;

    let enrollment = await Enrollment.findOne({
        $and: [
            { 'courseId': new ObjectId(courseId) },
            { 'termId': new ObjectId(termId) },
            { 'instructorId': new ObjectId(instructorId) }
        ]
    });

    if (enrollment) {
        return next(new ErrorResponse(`Enrollment already exists`));
    }

    let enrollmentObj = await Enrollment.create({
        enrollmentDate,
        courseId,
        instructorId,
        termId
    });

    res.status(200).json({
        success: true,
        data: enrollmentObj
    });

});

// @desc    Get all enrollment
// @route   GET /api/v1/enrollment
// @access  Private/Admin
exports.getAllEnrollment = asyncHandler(async(req, res, next) => {
    const enrollmentList = await Enrollment.find()
        .populate({
            path: 'courseId'
        })
        .populate({
            path: 'instructorId'
        })
        .populate({
            path: 'termId'
        });

    res.status(200).json({
        success: true,
        count: enrollmentList.length,
        data: enrollmentList
    });
});