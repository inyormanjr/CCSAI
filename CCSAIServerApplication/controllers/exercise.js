const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Exercise = require('../models/Exercise');
var ObjectId = require('mongoose').Types.ObjectId;

// @desc      Create exercise
// @route     POST /api/v1/exercises/
// @access    Private/Admin
exports.createExercise = asyncHandler(async(req, res, next) => {
    const { exerciseDetails, discussionId, exerciseName, instructions, points } = req.body;


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
        discussionId,
        exerciseName,
        instructions,
        points
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
    const { exerciseDetails, exerciseName, instructions, points } = req.body;


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
        exerciseDetails,
        exerciseName,
        instructions,
        points
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
// @route     GET /api/v1/exercises/:discussionId
// @access    Private/Admin/Instructor
exports.getExercisesByDiscussionId = asyncHandler(async(req, res, next) => {

    const exercises = await Exercise.find({ discussionId: new ObjectId(req.params.discussionId) });

    res.status(200).json({
        success: true,
        count: exercises.length,
        data: exercises
    });
});

// @desc      Get Exercises
// @route     GET /api/v1/exercises/
// @access    Private/Admin/Instructor
exports.getExercises = asyncHandler(async(req, res, next) => {

    const exercises = await Exercise.find();

    res.status(200).json({
        success: true,
        count: exercises.length,
        data: exercises
    });
});

// @desc      Change exercise status to Deactivated
// @route     PUT /api/v1/exercises/deactivate/:id
// @access    Private/Admin/
exports.deactivateExercise = asyncHandler(async(req, res, next) => {

    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
        return next(new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 404));
    }

    exercise = await Exercise.findByIdAndUpdate(req.params.id, { "exercise_status": "deactivated" }, {
        new: true,
        runValidators: false
    });

    res.status(200).json({
        success: true,
        data: exercise
    });

});

// @desc      Change exercise status to Activated
// @route     PUT /api/v1/exercises/activate/:id
// @access    Private/Admin/
exports.activateExercise = asyncHandler(async(req, res, next) => {

    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
        return next(new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 404));
    }

    exercise = await Exercise.findByIdAndUpdate(req.params.id, { "exercise_status": "active" }, {
        new: true,
        runValidators: false
    });

    res.status(200).json({
        success: true,
        data: exercise
    });

});