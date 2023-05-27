const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

// GET /students/:studentId/courses
exports.getCoursesByStudentId = asyncHandler(async (req, res) => {
  try {
    const studentId = req.params.studentId;

   
    const enrollments = await Enrollment.find({ studentId })
      .populate('courseId')
      .populate('instructorId');
    
      const courses = enrollments.map((enrollment) => ({
        courseId: enrollment.courseId._id,
        courseCode: enrollment.courseId.courseCode,
        course: enrollment.courseId.course,
        courseStatus: enrollment.courseId.course_status,
        instructor: {
          instructorId: enrollment.instructorId._id,
          name: enrollment.instructorId.fullName,
          email: enrollment.instructorId.email,
        },
      }));

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
