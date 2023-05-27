const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please add last name'],
    },
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true
    },
    role: {
        type: String,
        enum: ['admin',
            'instructor',
            'student'
        ],
        default: 'student',
    },
    user_status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 8,
        maxlength: 15,
        select: false, // does not include password to response
    },

});

UserSchema.pre('save', async function(next) {

    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({
        id: this._id,
        username: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


module.exports = mongoose.model('User', UserSchema);