const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const enrollmentDetail = require('../models/EnrollmentDetail');
var ObjectId = require('mongodb').ObjectId; 


exports.getCourseProgressByStudent = asyncHandler(async (req, res, next) => {
    let studentId = req.params.id;
    var obid = new ObjectId('62a465162e8f9724eb8342c6');
    result = await enrollmentDetail.aggregate([
      {
        $lookup: {
          from: 'enrollments',
          localField: 'enrollmentId',
          foreignField: '_id',
          as: 'enrollments',
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'enrollments.courseId',
          foreignField: '_id',
          as: 'courses',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'enrollments.instructorId',
          foreignField: '_id',
          as: 'instructor',
        },
      },

      {
        $project: {
          courses: 1,
          instructor: 1,
        },
      },

      {
        $match: { 'termId': obid },
      },
    ]);
    res.status(200).json(result);
});

exports.getExercisesProgressByStudent = asyncHandler(async (req, res, next) => {
    res.status(200).json({
      success: true,
      data: [
        {
          courseCode: 'CS101',
          courseName: 'Basic Programming',
          progressValue: 4,
          maxValue: 10,
        },
        {
          courseCode: 'CS101',
          courseName: 'Basic Programming',
          progressValue: 2,
          maxValue: 10,
        },
        {
          courseCode: 'CS101',
          courseName: 'Basic Programming',
          progressValue: 5,
          maxValue: 10,
        },
      ],
    });

});

exports.getAssessmentsProgressByStudent = asyncHandler(
  async (req, res, next) => {
        let studentId = req.params.id;
         res.status(200).json({
           success: true,
           data: [
             {
               courseCode: 'CS101',
               courseName: 'Basic Programming',
               progressValue: 2,
               maxValue: 10,
             },
             {
               courseCode: 'CS101',
               courseName: 'Basic Programming',
               progressValue: 2,
               maxValue: 10,
             },
             {
               courseCode: 'CS101',
               courseName: 'Basic Programming',
               progressValue: 7,
               maxValue: 10,
             },
           ],
         });
  }
);

exports.getCoursesByUserByCurrentActiveTerm = asyncHandler(
  async (req, res, next) => {
    let studentId = req.params.id;
  }
);

exports.getAnnouncements = asyncHandler(
  async (req, res, next) => {
    let studentId = req.params.id;
  }
);

exports.getRecentGradeUpdates = asyncHandler(async (req, res, next) => {
  let studentId = req.params.id;
});