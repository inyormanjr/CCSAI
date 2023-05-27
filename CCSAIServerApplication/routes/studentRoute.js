const express = require('express');
const { getCoursesByStudentId } = require('../controllers/studentController');

const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.get(
  '/:studentId/courses',
  protectUser,
  getCoursesByStudentId
);

module.exports = router;
