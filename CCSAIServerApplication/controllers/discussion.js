const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Discussion = require('../models/Discussion');
var ObjectId = require('mongoose').Types.ObjectId;


// @desc      Create Discussion
// @route     POST /api/v1/discussions/
// @access    Private/Admin
exports.createDiscussion = asyncHandler(async(req, res, next) => {
    const { discussion, moduleId, title } = req.body;

    let discussionObj = await Discussion.create({
        discussion,
        moduleId,
        title
    });

    res.status(200).json({
        success: true,
        data: discussionObj
    });

});


// @desc      Update Discussion
// @route     PUT /api/v1/discussions/:id
// @access    Private/Admin
exports.updateDiscussion = asyncHandler(async(req, res, next) => {
    const { discussion, title } = req.body;

    let selectedDiscussion = await Discussion.findById(req.params.id);


    if (!selectedDiscussion) {
        return next(new ErrorResponse(`Discussion not found.`));
    }

    let discussionObj = await Discussion.findByIdAndUpdate(req.params.id, {
        discussion
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: discussionObj
    });

});

// @desc    Get discussion by ModuleId
// @route   GET /api/v1/discussions/getByModuleId/:id
// @access  Private/Admin
exports.getDiscussionByModuleId = asyncHandler(async(req, res, next) => {
    const discussions = await Discussion.find({ moduleId: new ObjectId(req.params.id) })
        .populate({
            path: 'moduleId'
        });

    res.status(200).json({
        success: true,
        data: discussions
    });
});