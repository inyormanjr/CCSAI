const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const EnrollmentDetail = require('../models/EnrollmentDetail');
const Enrollment = require('../models/Enrollment');
const Discussion = require('../models/Discussion');
const { Assessment } = require('../models/Assessment');
const Course = require('../models/Course');
const User = require('../models/User');
const Module = require('../models/Module');


exports.getCoursesByStudentId = asyncHandler(async (req, res) => {
  const studentId = req.loggedUser._id;

  const enrollmentDetails = await EnrollmentDetail.find({
    studentId,
  }).populate({
    path: 'enrollmentId',
    populate: [
      { path: 'courseId', model: Course },
      { path: 'instructorId', model: User },
    ],
  });

  const courses = await Promise.all(
    enrollmentDetails.map(async (detail) => {
      const enrollment = detail.enrollmentId;
      const { _id, courseCode, course, course_status } = enrollment.courseId;
      const {
        _id: instructorId,
        fullName: name,
        email,
      } = enrollment.instructorId;

      const discussionCount = await Discussion.countDocuments({
        courseId: _id,
      });

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
  const studentId = req.loggedUser._id;
  const { courseCode } = req.query;

  const enrollmentDetails = await EnrollmentDetail.find({ studentId }).populate(
    {
      path: 'enrollmentId',
      populate: [
        { path: 'courseId', model: Course, match: { courseCode } },
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

      const discussionCount = await Discussion.countDocuments({
        courseId: _id,
      });
      const assessmentCount = await Assessment.countDocuments({
        courseId: _id,
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

// GET /students/:studentId/courses/:courseId
exports.getCourseByIdAndStudentId = asyncHandler(async (req, res) => {
  const studentId = req.loggedUser._id;
  const courseId = req.params.courseId;

  // Find the enrollment detail for the student and the specified course, then populate the necessary fields
  const enrollmentDetail = await EnrollmentDetail.findOne({ studentId }).populate({
    path: 'enrollmentId',
    populate: [
      { path: 'courseId', model: Course, match: { _id: courseId } },
      { path: 'instructorId', model: User },
    ],
  });

  if (!enrollmentDetail) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const enrollment = enrollmentDetail.enrollmentId;
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

  res.status(200).json(formattedCourse);
});



// GET /students/:studentId/modules
exports.getModulesByStudentId = asyncHandler(async (req, res) => {
  const studentId = req.loggedUser._id;

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

  const modules = await Promise.all(
    enrollmentDetails.map(async (detail) => {
      const enrollment = detail.enrollmentId;
      const { moduleId, module } = await Module.findOne({
        courseId: enrollment.courseId,
      });

      const discussions = await Discussion.find({ moduleId });
      const assessments = await Assessment.find({ moduleId });

      return {
        moduleId,
        module,
        discussions,
        assessments,
      };
    })
  );

  res.status(200).json(modules);
});