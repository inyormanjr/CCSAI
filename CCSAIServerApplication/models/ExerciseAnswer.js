const mongoose = require('mongoose');

const ExerciseAnswer = new mongoose.Schema(
    {
        exercise: {
            type: mongoose.Schema.ObjectId,
            ref: 'Exercise',
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        points: {
            type: Number,
            required: true,
            default: 0
        },
        student: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ExerciseAnswer', ExerciseAnswer);