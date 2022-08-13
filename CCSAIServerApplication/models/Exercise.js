const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  discussionId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Discussion',
    required: true,
  },
  exerciseName: { type: String, required: true },
  instructions: {
    type: String,
    required: true,
  },
  exercise_status : { type: String, required: true , default : "active" },
  exerciseDetails: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Exercise', ExerciseSchema);