const express = require('express');
const {
    changeUserPassword,
    changeUserPasswordAdmin,
    updateUserById,
    getAllUsers,
    activateUser,
    deactivateUser,
    getUserById,
    register,
    getUserByRole
} = require('../controllers/users');
const User = require('../models/User');
const router = express.Router();
const { protectUser, authorize } = require('../middleware/auth');

router.route('/')
    .get(protectUser,
        authorize('admin'),
        getAllUsers)
    .post(protectUser,
        authorize('admin'),
        register);

router.route('/activate/:id')
    .put(protectUser,
        authorize('admin'),
        activateUser);

router.route('/deactivate/:id')
    .put(protectUser,
        authorize('admin'),
        deactivateUser);

router.route('/updateuser/:id')
    .put(protectUser,
        authorize('admin'),
        updateUserById);

router.route('/roles/:role')
    .get(protectUser,
        authorize('admin'),
        getUserByRole);

router.route('/:id')
    .get(protectUser,
        getUserById);

router.route('/changeuserpassword').put(protectUser, changeUserPassword);
router.route('/changeuserpassword/:id').put(protectUser, authorize('admin'), changeUserPasswordAdmin);
module.exports = router;