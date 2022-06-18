const express = require('express');
const {
    createModule,
    getModulesByCourseId
} = require('../controllers/modules');

const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.route('/')
    .post(protectUser,
        authorize('admin', 'instructor'),
        createModule);


router.route('/getmodulesbycourseid/:id')
    .get(protectUser,
        authorize('admin', 'instructor'), getModulesByCourseId);

module.exports = router;