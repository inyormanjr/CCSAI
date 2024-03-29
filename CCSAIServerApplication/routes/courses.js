const express = require('express');
const {
    createCourse,
    updateCourse,
    getAllCourses,
    getCourseById,
    activateCourse,
    deactivateCourse,
    getAllActiveCourses
} = require('../controllers/courses');
const Course = require('../models/Course');
const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');


router.route('/')
    .post(protectUser,
        authorize('admin', 'instructor'),
        createCourse);

router.route('/')
    .get(protectUser,
        authorize('admin', 'instructor'), getAllCourses);

router.route('/active')
    .get(protectUser,
        authorize('admin', 'instructor'), getAllActiveCourses);

router.route('/activate/:id')
    .put(protectUser,
        authorize('admin', 'instructor'),
        activateCourse);

router.route('/deactivate/:id')
    .put(protectUser,
        authorize('admin', 'instructor'),
        deactivateCourse);

router.route('/:id')
    .put(protectUser,
        authorize('admin', 'instructor'),
        updateCourse);

router.route('/:id')
    .get(protectUser,
        authorize('admin', 'instructor'),
        getCourseById);

module.exports = router;