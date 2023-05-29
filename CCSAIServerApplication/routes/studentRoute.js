const express = require('express');
const {
  getCoursesByStudentId,
  getCoursesByStudentIdWithParams,
  getCourseByIdAndStudentId,
  getModulesByStudentId
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

// GET /students/:studentId/modules
router.get('/modules', protectUser, getModulesByStudentId);


module.exports = router;
