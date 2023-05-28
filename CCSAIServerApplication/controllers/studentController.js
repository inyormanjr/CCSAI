const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const EnrollmentDetail = require('../models/EnrollmentDetail');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

// GET /students/:studentId/courses
exports.getCoursesByStudentId = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId;

  // Find enrollment details for the student and populate the 'enrollmentId' field along with the 'courseId' and 'instructorId' fields
  const enrollmentDetails = await EnrollmentDetail.find({ studentId }).populate(
    {
      path: 'enrollmentId',
      populate: [
        { path: 'courseId', model: Course },
        { path: 'instructorId', model: User },
      ],
    }
  );

  // Extract the courses from the enrollment details and format them according to the Course interface
  const courses = enrollmentDetails.map((detail) => {
    const enrollment = detail.enrollmentId;
    const { _id, courseCode, course, course_status } = enrollment.courseId;
    const {
      _id: instructorId,
      fullName: name,
      email,
    } = enrollment.instructorId;

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
    };

    return formattedCourse;
  });

  res.status(200).json(courses);
});
