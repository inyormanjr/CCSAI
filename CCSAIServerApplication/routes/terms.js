const express = require('express');
const {
    createTerm,
    updateTerm,
    getAllTerms,
    getTermById
} = require('../controllers/terms');
const Term = require('../models/Term');
const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');


router.route('/')
    .post(protectUser,
        authorize('admin'),
        createTerm);

router.route('/').get(protectUser, authorize('admin'), getAllTerms);

router.route('/:id')
    .get(protectUser,
        authorize('admin'),
        getTermById);

router.route('/:id')
    .put(protectUser,
        authorize('admin'),
        updateTerm);

module.exports = router;