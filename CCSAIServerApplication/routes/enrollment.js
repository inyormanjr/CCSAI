const express = require('express');
const {
    getAllEnrollment,
    createEnrollment
} = require('../controllers/enrollment');
const Enrollment = require('../models/Enrollment');
const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.route('/')
    .post(protectUser,
        authorize('admin'),
        createEnrollment);

router.route('/')
    .get(protectUser,
        authorize('admin'), getAllEnrollment);

module.exports = router;