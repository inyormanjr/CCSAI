const express = require('express');
const {
    createModule,
    getModulesByCourseId,
    getModuleById,
    updateModuleById
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


router.route('/:id')
    .get(protectUser,
        authorize('admin', 'instructor'), getModuleById);

router.route('/:id')
    .put(protectUser,
        authorize('admin', 'instructor'), updateModuleById);


module.exports = router;