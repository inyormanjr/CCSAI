const express = require('express');
const {
    createExercise,
    getExercisesByDiscussionId,
    updateExercise,
    deactivateExercise,
    activateExercise,
    getExercises
} = require('../controllers/exercise');
const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.route('/')
    .post(protectUser,
        authorize('admin', 'instructor'),
        createExercise);

router.route('/')
    .get(protectUser,
        authorize('admin', 'instructor'),
        getExercises);



router.route('/getbydiscussionid/:discussionId')
    .get(protectUser,
        authorize('admin', 'instructor'),
        getExercisesByDiscussionId);

router.route('/deactivate/:id')
    .put(protectUser,
        authorize('admin', 'instructor'),
        deactivateExercise);

router.route('/activate/:id')
    .put(protectUser,
        authorize('admin', 'instructor'),
        activateExercise);

router.route('/:id')
    .put(protectUser,
        authorize('admin', 'instructor'),
        updateExercise);

module.exports = router;