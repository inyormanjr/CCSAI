const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// GET /students/:studentId/courses
exports.getCoursesByStudentId = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find enrollments for the student and populate the 'courseId' field
    const enrollments = await Enrollment.find({ studentId }).populate(
      'courseId'
    );

    // Extract the courses from the enrollments
    const courses = enrollments.map((enrollment) => enrollment.courseId);

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
