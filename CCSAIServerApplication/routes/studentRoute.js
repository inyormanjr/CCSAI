const express = require('express');
const {
  getCoursesByStudentId,
  getCoursesByStudentIdWithParams,
} = require('../controllers/studentController');

const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.get('/:studentId/courses', protectUser, getCoursesByStudentId);

router.get('/:studentId/courses', protectUser, getCoursesByStudentIdWithParams);

module.exports = router;
