const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Term = require('../models/Term');
var ObjectId = require('mongoose').Types.ObjectId;

// @desc      Create Term
// @route     POST /api/v1/terms/
// @access    Private/Admin
exports.createTerm = asyncHandler(async(req, res, next) => {
    const { termName } = req.body;
    let termObj = await Term.create({
        "termName": termName
    });

    res.status(200).json({
        success: true,
        data: termObj
    });

});

// @desc      Update Term
// @route     PUT /api/v1/terms/:id
// @access    Private/Admin
exports.updateTerm = asyncHandler(async(req, res, next) => {

    let termObj = await Term.findById(req.params.id);

    if (!termObj) {
        return next(new ErrorResponse(`Term not found with id of ${req.params.id}.`));
    }

    const { termName } = req.body;
    termObj = await Term.findByIdAndUpdate(req.params.id, {
        "termName": termName
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: termObj
    });

});

// @desc    Get all terms
// @route   GET /api/v1/terms
// @access  Private/Admin
exports.getAllTerms = asyncHandler(async(req, res, next) => {
    const terms = await Term.find();

    res.status(200).json({
        success: true,
        count: terms.length,
        data: terms
    });
});

// @desc        Get term by Id
// @route       GET /api/v1/terms/:id
// @access      Private/Admin
exports.getTermById = asyncHandler(async(req, res, next) => {
    const term = await Term.findById(req.params.id);

    if (!term) {
        return next(new ErrorResponse(`Term not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: term
    });
});