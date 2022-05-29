const express = require('express');

const {
    register,
    login,
    authUser
} = require('../controllers/auth');

const router = express.Router();

const { protectUser, authorize } = require('../middleware/auth');

router.post('/login', login);
router.get('/authuser', protectUser, authUser)
router.route('/register').post(protectUser, authorize('admin'), register);

module.exports = router;