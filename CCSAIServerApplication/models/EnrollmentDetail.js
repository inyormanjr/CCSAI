const mongoose = require('mongoose');

const EnrollmentDetailSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    enrollmentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Enrollment',
        required: true
    },
    enrollDetailDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('EnrollmentDetail', EnrollmentDetailSchema);