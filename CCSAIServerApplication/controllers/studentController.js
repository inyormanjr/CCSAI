const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const EnrollmentDetail = require('../models/EnrollmentDetail');
const Enrollment = require('../models/Enrollment');
const Discussion = require('../models/Discussion');
const { Assessment } = require('../models/Assessment');
const Course = require('../models/Course');
const User = require('../models/User');



exports.getCoursesByStudentId = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId;
  const enrollmentDetails = await EnrollmentDetail.find({ studentId }).populate(
    {
      path: 'enrollmentId',
      populate: [
        { path: 'courseId', model: Course },
        { path: 'instructorId', model: User },
      ],
    }
  );

  const courses = await Promise.all(
    enrollmentDetails.map(async (detail) => {
      const enrollment = detail.enrollmentId;
      const { _id, courseCode, course, course_status } = enrollment.courseId;
      const {
        _id: instructorId,
        fullName: name,
        email,
      } = enrollment.instructorId;

      // Count the number of discussions for the course
      const discussionCount = await Discussion.countDocuments({
        courseId: _id,
      });

      // Count the number of assessments for the course
      const assessmentCount = await Assessment.countDocuments({
        moduleId: _id,
      });

      const formattedCourse = {
        courseId: _id,
        courseCode,
        course,
        courseStatus: course_status,
        instructor: {
          instructorId,
          name,
          email,
        },
        discussionCount,
        assessmentCount,
      };

      return formattedCourse;
    })
  );

  res.status(200).json(courses);
});



// GET /students/:studentId/courses?courseCode=:courseCode
exports.getCoursesByStudentIdWithParams = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId;
  const { courseCode } = req.query;

  // Find enrollment details for the student and filter by courseCode, then populate the necessary fields
  const enrollmentDetails = await EnrollmentDetail.find({ studentId }).populate({
    path: 'enrollmentId',
    populate: [
      { path: 'courseId', model: Course, match: { courseCode } },
      { path: 'instructorId', model: User },
    ],
  });

  // Extract the courses from the enrollment details and format them
  const courses = await Promise.all(
    enrollmentDetails.map(async (detail) => {
      const enrollment = detail.enrollmentId;
      const { _id, courseCode, course, course_status } = enrollment.courseId;
      const { _id: instructorId, fullName: name, email } = enrollment.instructorId;

      // Count the number of discussions for the course
      const discussionCount = await Discussion.countDocuments({ courseId: _id });

      // Count the number of assessments for the course
      const assessmentCount = await Assessment.countDocuments({ courseId: _id });

      const formattedCourse = {
        courseId: _id,
        courseCode,
        course,
        courseStatus: course_status,
        instructor: {
          instructorId,
          name,
          email,
        },
        discussionCount,
        assessmentCount,
      };

      return formattedCourse;
    })
  );

  res.status(200).json(courses);
});