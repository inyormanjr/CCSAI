const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    termId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Term',
        required: true
    },
    instructorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);