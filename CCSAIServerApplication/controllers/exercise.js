const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Exercise = require('../models/Exercise');
var ObjectId = require('mongoose').Types.ObjectId;

// @desc      Create exercise
// @route     POST /api/v1/exercises/
// @access    Private/Admin
exports.createExercise = asyncHandler(async(req, res, next) => {
    const { exerciseDetails, discussionId } = req.body;


    const exDetailsArray = exerciseDetails.split(" ");
    var answers = [];

    exDetailsArray.forEach(word => {
        if (word.toLowerCase().includes("[q-blank]")) {
            let slicedWord = word.slice(9);
            answers.push(slicedWord);
        }
    });

    let exerciseObj = await Exercise.create({
        answers,
        exerciseDetails,
        discussionId
    });

    res.status(200).json({
        success: true,
        data: exerciseObj
    });

});

// @desc      Update exercise
// @route     PUT /api/v1/exercises/:id
// @access    Private/Admin
exports.updateExercise = asyncHandler(async(req, res, next) => {
    const { exerciseDetails } = req.body;


    const exDetailsArray = exerciseDetails.split(" ");
    var answers = [];

    exDetailsArray.forEach(word => {
        if (word.toLowerCase().includes("[q-blank]")) {
            let slicedWord = word.slice(9);
            answers.push(slicedWord);
        }
    });

    let exerciseObj = await Exercise.findByIdAndUpdate(new ObjectId(req.params.id), {
        answers,
        exerciseDetails
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: exerciseObj
    });

});

// @desc      Get Exercises By Discussion Id
// @route     POST /api/v1/exercises/:discussionId
// @access    Private/Admin/Instructor
exports.getExercisesByDiscussionId = asyncHandler(async(req, res, next) => {

    const exercises = await Exercise.find({ discussionId: new ObjectId(req.params.discussionId) });

    res.status(200).json({
        success: true,
        count: exercises.length,
        data: exercises
    });
});