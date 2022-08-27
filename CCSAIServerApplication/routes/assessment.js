const express = require('express');
const {
    createAssessment,
    getAssessmentByModuleId,
    deactivateAssessment,
    activateAssessment
} = require('../controllers/assessment');
const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.route('/')
    .post(protectUser,
        authorize('admin', 'instructor'),
        createAssessment);

router.route('/getassessmentsbymoduleid/:moduleId')
    .get(protectUser,
        authorize('admin', 'instructor'),
        getAssessmentByModuleId);

router.route('/deactivate/:id')
    .put(protectUser,
        authorize('admin', 'instructor'),
        deactivateAssessment);

router.route('/activate/:id')
    .put(protectUser,
        authorize('admin', 'instructor'),
        activateAssessment);

module.exports = router;