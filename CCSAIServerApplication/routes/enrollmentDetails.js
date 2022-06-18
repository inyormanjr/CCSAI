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
        authorize('admin'),
        createEnrollmentDetail);

router.route('/getbyenrollmentid/:id')
    .get(protectUser,
        authorize('admin'), getEnrollmentDetailByEnrollmentId);

router.route('/:id')
    .delete(protectUser,
        authorize('admin'), deleteEnrollmentDetailById);

module.exports = router;