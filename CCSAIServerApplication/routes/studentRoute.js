const express = require('express');
const {
  getCoursesByStudentId,
  getCoursesByStudentIdWithParams,
  getCourseByIdAndStudentId,
  getModulesByCourse,
  getExerciseByDiscussionIdandStudentId,
  getModuleDiscussionByPage
} = require('../controllers/studentController');

const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.get('/courses', protectUser, getCoursesByStudentId);

router.get('/courses', protectUser, getCoursesByStudentIdWithParams);

router.get(
  '/courses/:courseId',
  protectUser,
  getCourseByIdAndStudentId
);

router.get('/course/:courseId/modules', protectUser, getModulesByCourse);

router.get(
  '/course/discussion/:id/exercise',
  protectUser,
  getExerciseByDiscussionIdandStudentId
);

router.get(
  '/course/module/:moduleId/discussion/page/:page',
  protectUser,
  getModuleDiscussionByPage
);



module.exports = router;
