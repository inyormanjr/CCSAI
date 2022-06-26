const express = require('express');
const {
    createDiscussion,
    updateDiscussion,
    getDiscussionByModuleId
} = require('../controllers/discussion');

const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.route('/')
    .post(protectUser,
        authorize('admin', 'instructor'),
        createDiscussion);

router.route('/getdiscussionsbymoduleid/:id')
    .get(protectUser,
        authorize('admin', 'instructor'), getDiscussionByModuleId);

router.route('/:id')
    .put(protectUser,
        authorize('admin', 'instructor'), updateDiscussion);


module.exports = router;