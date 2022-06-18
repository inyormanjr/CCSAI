const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Module = require('../models/Module');
var ObjectId = require('mongoose').Types.ObjectId;

// @desc      Create Module
// @route     POST /api/v1/module/
// @access    Private/Admin/Instructor
exports.createModule = asyncHandler(async(req, res, next) => {
    const { courseId, module } = req.body;

    let selectedModule = await Module.findOne({
        $and: [
            { 'courseId': new ObjectId(courseId) },
            { module }
        ]
    });

    if (selectedModule) {
        return next(new ErrorResponse(`Module already exists`));
    }

    let moduleObj = await Module.create({
        courseId,
        module
    });

    res.status(200).json({
        success: true,
        data: moduleObj
    });
});

// @desc    Get module by courseId
// @route   GET /api/v1/module/getbycourseId/:id
// @access  Private/Admin/Instructor
exports.getModulesByCourseId = asyncHandler(async(req, res, next) => {
    const modules = await Module.find({ courseId: new ObjectId(req.params.id) });

    res.status(200).json({
        success: true,
        data: modules
    });
});

// @desc    Get module by id
// @route   GET /api/v1/module/:id
// @access  Private/Admin/Instructor
exports.getModuleById = asyncHandler(async(req, res, next) => {



    const module = await Module.findOne({ _id: new ObjectId(req.params.id) })
        .populate({
            path: 'courseId'
        });

    if (!module) {
        return next(new ErrorResponse(`Module not found`));
    }

    res.status(200).json({
        success: true,
        data: module
    });
});

// @desc    Update module by id
// @route   PUT /api/v1/module/:id
// @access  Private/Admin/Instructor
exports.updateModuleById = asyncHandler(async(req, res, next) => {

    const { courseId, module } = req.body;

    const selectedModule = await Module.findOne({ _id: new ObjectId(req.params.id) })
        .populate({
            path: 'courseId'
        });

    if (!selectedModule) {
        return next(new ErrorResponse(`Module not found`));
    }

    let moduleCheck = await Module.findOne({
        $and: [
            { 'courseId': new ObjectId(courseId) },
            { module }
        ]
    });

    if (moduleCheck) {
        return next(new ErrorResponse(`Module already exists`));
    }

    let updatedModule = await Module.findByIdAndUpdate(new ObjectId(req.params.id), {
        module
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: updatedModule
    });
});