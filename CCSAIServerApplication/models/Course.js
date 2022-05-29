const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: [true, 'Please add a course code'],
        unique: true
    },
    course: {
        type: String,
        required: [true, 'Please add course'],
        unique: true,
    },
    course_status: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    },
});

module.exports = mongoose.model('Course', CourseSchema);