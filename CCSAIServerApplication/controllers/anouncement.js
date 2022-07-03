const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Anouncement = require('../models/Anouncement');
var ObjectId = require('mongoose').Types.ObjectId;




exports.create = asyncHandler(async (req, res, next) => {
    const newAnouncement = req.body;
    let result = await Anouncement.create(newAnouncement);
    res.status(200).json({
        success: true,
        data: result
    });
});

exports.update = asyncHandler(async (req, res, next) => {
    let anouncementId = ObjectId(req.params.id);
    let updatedAnouncement = req.body;
    let result = await Anouncement.findByIdAndUpdate(anouncementId, updatedAnouncement);
    res.status(200).json({
        success: true,
        data: result
    });
});

exports.getllAll = asyncHandler(async (req, res, next) => {
    const anouncementList = await Anouncement.find().populate({
        path: 'createdBy'
    });

    res.status(200).json({
        success: true,
        count: anouncementList.length,
        data: anouncementList
    });
});

exports.getById = asyncHandler(async (req, res, next) => {
    const anouncement = await Anouncement.findOne({
      _id: new ObjectId(req.params.id),
    }).populate({ path: 'createdBy' });
    
    res.status(200).json({
        success: true,
        data: anouncement
    });
});

exports.remove = asyncHandler(async (req, res, next) => {
    const result = await Anouncement.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.status(200).json({
        success: true
    });
});

