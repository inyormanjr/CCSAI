const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const EnrollmentDetail = require('../models/EnrollmentDetail');
const Enrollment = require('../models/Enrollment');
const Discussion = require('../models/Discussion');
const { Assessment } = require('../models/Assessment');
const Course = require('../models/Course');
const User = require('../models/User');
const Module = require('../models/Module');
const Exercise = require('../models/Exercise');
const ExerciseAnswer = require('../models/ExerciseAnswer');


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



// GET /students/:courseId/modules
exports.getModulesByCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const modules = await Module.find({ courseId });

  const modulePromises = modules.map(async (module) => {
    const { _id, module: moduleName } = module;
    const discussions = await Discussion.find({ moduleId: _id })
      .select('_id title')
      .sort('_id');;
    const perPage = 1; // Number of discussions per page

    const totalPages = Math.ceil(discussions.length / perPage);

    const discussionsWithPage = discussions.map((discussion, index) => {
      const pageNumber = Math.ceil((index + 1) / perPage);
      return { ...discussion.toObject(), page: pageNumber };
    });

    const assessments = await Assessment.find({ moduleId: _id })
      .select('_id assessmentName')
      .sort('_id');

    return {
      _id,
      module: moduleName,
      discussions: discussionsWithPage,
      assessments,
      totalPages,
    };
  });

  const modulesWithDiscussions = await Promise.all(modulePromises);
  const reversedModules = modulesWithDiscussions;

  res.status(200).json(reversedModules);
});




exports.getModuleDiscussionByPage = asyncHandler(async (req, res) => {
  const moduleId = req.params.moduleId;
  const pageIndex = req.params.page;

  const module = await Module.findById(moduleId);

  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }

  const course = await Course.findById(module.courseId);

  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  const discussions = await Discussion.find({ moduleId }).sort('_id');

  const totalPages = discussions.length;
  const requestedPageIndex = parseInt(pageIndex, 10);

  if (requestedPageIndex < 1 || requestedPageIndex > totalPages) {
    return res.status(400).json({ error: 'Invalid page index' });
  }

  const discussionIndex = requestedPageIndex - 1;
  const selectedDiscussion = discussions[discussionIndex];

  if (!selectedDiscussion) {
    return res.status(404).json({ error: 'Discussion not found' });
  }

  const exercise = await Exercise.findOne({
    discussionId: selectedDiscussion._id,
  });

  const previousPage = requestedPageIndex > 1 ? requestedPageIndex - 1 : null;
  const nextPage =
    requestedPageIndex < totalPages ? requestedPageIndex + 1 : null;

  const moduleDiscussionResult = {
    courseId: course._id,
    courseName: course.course,
    moduleId: module._id,
    moduleName: module.module,
    discussion: { ...selectedDiscussion.toObject() , exercise: exercise},
    totalPages,
    currentPage: requestedPageIndex,
    previousPage,
    nextPage,
  };

  res.status(200).json(moduleDiscussionResult);
});









exports.getExerciseByDiscussionIdandStudentId = asyncHandler(
  async (req, res) => {
    console.log(req.params.id);
    const discussionId = req.params.id;
    const studentId = req.loggedUser.id; // Assuming you have the authenticated user's ID

    const exercise = await Exercise.findOne({
      discussionId: discussionId,
    }).populate('moduleId');

    console.log(exercise);
    let exerciseAnswer;

    if (studentId) {
      exerciseAnswer = await ExerciseAnswer.findOne({
        exercise: exercise._id,
        student: studentId,
      });
    }

    if (exerciseAnswer) {
      exercise.exerciseAnswer = exerciseAnswer;
    }

    res.status(200).json(exercise);
  }
);



exports.submittedExerciseAnswerById = asyncHandler(async (req, res) => {

});
