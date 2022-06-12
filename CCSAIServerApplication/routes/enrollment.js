const express = require('express');
const {
    getAllEnrollment,
    createEnrollment,
    updateEnrollment,
    getEnrollmentById
} = require('../controllers/enrollment');
const Enrollment = require('../models/Enrollment');
const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.route('/')
    .post(protectUser,
        authorize('admin'),
        createEnrollment);
router.route('/:id')
    .put(protectUser,
        authorize('admin'),
        updateEnrollment);

router.route('/')
    .get(protectUser,
        authorize('admin'), getAllEnrollment);

router.route('/:id')
    .get(protectUser,
        authorize('admin'), getEnrollmentById);

module.exports = router;