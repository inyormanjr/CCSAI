const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const EnrollmentDetails = require('../models/EnrollmentDetail');
var ObjectId = require('mongoose').Types.ObjectId;

// @desc      Create EnrollmentDetails
// @route     POST /api/v1/enrollmentdetail/
// @access    Private/Admin
exports.createEnrollmentDetail = asyncHandler(async(req, res, next) => {
    const { enrollDetailDate, enrollmentId, studentId } = req.body;

    let enrollmentDetail = await EnrollmentDetails.findOne({
        $and: [
            { 'enrollmentId': new ObjectId(enrollmentId) },
            { 'studentId': new ObjectId(studentId) }
        ]
    });

    if (enrollmentDetail) {
        return next(new ErrorResponse(`Enrollment Detail already exists`));
    }

    if (enrollDetailDate.month.toString().length == 1) {
        enrollDetailDate.month = '0' + enrollDetailDate.month;

    }
    if (enrollDetailDate.day.toString().length == 1) {
        enrollDetailDate.day = '0' + enrollDetailDate.day;
    }

    const date = `${enrollDetailDate.year}-${enrollDetailDate.month}-${enrollDetailDate.day}`;
    const formattedDate = new Date(date);

    let enrollmentDetailObj = await EnrollmentDetails.create({
        enrollDetailDate: formattedDate,
        studentId,
        enrollmentId
    });

    res.status(200).json({
        success: true,
        data: enrollmentDetailObj
    });
});

// @desc    Get enrollmentDetail by EnrollmentId
// @route   GET /api/v1/enrollmentdetail/getbyEnrollmentId/:id
// @access  Private/Admin
exports.getEnrollmentDetailByEnrollmentId = asyncHandler(async(req, res, next) => {
    const enrollmentDetails = await EnrollmentDetails.find({ enrollmentId: new ObjectId(req.params.id) })
        .populate({
            path: 'studentId'
        });

    res.status(200).json({
        success: true,
        data: enrollmentDetails
    });
});

// @desc    Delete enrollmentDetail by Id
// @route   DELETE /api/v1/enrollmentdetail/:id
// @access  Private/Admin
exports.deleteEnrollmentDetailById = asyncHandler(async(req, res, next) => {
    const enrollmentDetail = await EnrollmentDetails.findOne({ _id: new ObjectId(req.params.id) });


    if (!enrollmentDetail) {
        return next(new ErrorResponse(`Enrollment Detail doesn't exists`));
    }

    await EnrollmentDetails.deleteOne({ _id: new ObjectId(req.params.id) });

    res.status(200).json({
        success: true,
        data: undefined
    });
});