const express = require('express');

const { protectUser, authorize } = require('../middleware/auth');
const router = express.Router();
const { create, getAll, getById, update, remove } = require('../controllers/anouncement');

router.route('/').post(protectUser, authorize('admin'), create)

router.route('/:id').put(protectUser, authorize('admin'), update)

router.route('/').get(protectUser, authorize('admin'), getAll)

router.route('/:id').get(protectUser, authorize('admin'), getById)

router.route('/:id').delete(protectUser, authorize('admin'), remove)

module.exports = router;