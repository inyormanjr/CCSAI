const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    discussionId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Discussion',
        required: true
    },
    exerciseDetails: {
        type: String,
        required: true
    },
    answers: [{
        type: String
    }]
});

module.exports = mongoose.model('Exercise', ExerciseSchema);