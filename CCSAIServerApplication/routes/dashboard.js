const express = require('express');
const dc = require('../controllers/dashboard');
const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');


router.route('/progress/courses/:id').get(dc.getCourseProgressByStudent);

router.route('/progress/exercises/:id').get(protectUser, dc.getExercisesProgressByStudent);

router
  .route('/progress/assessments/:id')
    .get(protectUser, dc.getAssessmentsProgressByStudent);

router
    .route('/anouncements')
  .get(protectUser, dc.getAnnouncements);
      
router.route('/courses').get(dc.getCoursesByUserByCurrentActiveTerm);
    
router.route('/grades/:id').get(protectUser, dc.getRecentGradeUpdates);

module.exports = router;