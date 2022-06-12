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

    if (enrollmentDate.month.toString().length == 1) {
        enrollmentDate.month = '0' + enrollmentDate.month;

    }
    if (enrollmentDate.day.toString().length == 1) {
        enrollmentDate.day = '0' + enrollmentDate.day;
    }

    const date = `${enrollmentDate.year}-${enrollmentDate.month}-${enrollmentDate.day}`
    const formattedDate = new Date(date);

    let enrollmentObj = await Enrollment.create({
        enrollmentDate: formattedDate,
        courseId,
        instructorId,
        termId
    });

    res.status(200).json({
        success: true,
        data: enrollmentObj
    });

});

// @desc      Update Enrollment
// @route     PUT /api/v1/enrollment/
// @access    Private/Admin
exports.updateEnrollment = asyncHandler(async(req, res, next) => {
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

    if (enrollmentDate.month.toString().length == 1) {
        enrollmentDate.month = '0' + enrollmentDate.month;

    }
    if (enrollmentDate.day.toString().length == 1) {
        enrollmentDate.day = '0' + enrollmentDate.day;
    }

    const date = `${enrollmentDate.year}-${enrollmentDate.month}-${enrollmentDate.day}`;
    const formattedDate = new Date(date);


    let enrollmentObj = await Enrollment.findByIdAndUpdate(new ObjectId(req.params.id), {
        enrollmentDate: formattedDate,
        courseId,
        instructorId,
        termId
    }, {
        new: true,
        runValidators: true
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

// @desc    Get enrollment by Id
// @route   GET /api/v1/enrollment/:id
// @access  Private/Admin
exports.getEnrollmentById = asyncHandler(async(req, res, next) => {
    const enrollment = await Enrollment.findOne({ _id: new ObjectId(req.params.id) })
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
        data: enrollment
    });
});