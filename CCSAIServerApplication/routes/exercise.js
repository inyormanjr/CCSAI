const express = require('express');
const {
    createExercise,
    getExercisesByDiscussionId,
    updateExercise
} = require('../controllers/exercise');
const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.route('/')
    .post(protectUser,
        authorize('admin', 'instructor'),
        createExercise);


router.route('/getbydiscussionid/:discussionId')
    .get(protectUser,
        authorize('admin', 'instructor'),
        getExercisesByDiscussionId);

router.route('/:id')
    .put(protectUser,
        authorize('admin', 'instructor'),
        updateExercise);

module.exports = router;