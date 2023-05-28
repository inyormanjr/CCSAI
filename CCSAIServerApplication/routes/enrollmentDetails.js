const express = require('express');
const {
    getEnrollmentDetailByEnrollmentId,
    createEnrollmentDetail,
    deleteEnrollmentDetailById
} = require('../controllers/enrollmentDetails');

const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');


router.route('/')
    .post(protectUser,
        authorize('admin', 'instructor'),
        createEnrollmentDetail);

router.route('/getbyenrollmentid/:id')
    .get(protectUser,
        authorize('admin', 'instructor'), getEnrollmentDetailByEnrollmentId);

router.route('/:id')
    .delete(protectUser,
        authorize('admin', 'instructor'), deleteEnrollmentDetailById);

module.exports = router;