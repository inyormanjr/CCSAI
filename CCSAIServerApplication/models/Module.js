const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    module: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Module', ModuleSchema);