const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Assessment = require('../models/Assessment');
var ObjectId = require('mongoose').Types.ObjectId;

// @desc      Create assessment
// @route     POST /api/v1/assessment/
// @access    Private/Admin
exports.createAssessment = asyncHandler(async(req, res, next) => {
    const { moduleId, assessmentName, assessmentGroup } = req.body;

    let assessment = await Assessment[0].create({
        moduleId,
        assessmentName
    });

    assessmentGroup.forEach(async group => {
        let agroup = await Assessment[1].create({
            assessmentId: assessment._id,
            groupName: group.groupName
        });

        group.questions.forEach(async question => {

            const questionArray = question.questionDetail.split(" ");
            var answers = [];
            //var questionCount = 0;
            questionArray.forEach(word => {
                if (word.toLowerCase().includes("[q-blank]")) {
                    let slicedWord = word.slice(9);
                    answers.push(slicedWord);
                    //questionCount++;
                }
            });

            //const points = question.points / questionCount;

            let aquestion = await Assessment[2].create({
                assessmentGroupId: agroup._id,
                points: question.points,
                questionDetail: question.questionDetail,
                instructions: question.instructions,
                answers
            });
        });
    })

    res.status(200).json({
        success: true,
        data: assessment
    });

});


// @desc      Get Assessment By Module Id
// @route     POST /api/v1/assessment/getassessmentsbymoduleid/:moduleId
// @access    Private/Admin/Instructor
exports.getAssessmentByModuleId = asyncHandler(async(req, res, next) => {


    const moduleId = new ObjectId(req.params.moduleId);

    const assessments = await Assessment[0].aggregate([{ $match: { moduleId } },
        {
            $lookup: {
                from: "assessmentgroups",
                localField: '_id',
                foreignField: 'assessmentId',
                as: "assessmentgroups",
                pipeline: [{
                    $lookup: {
                        from: "assessmentquestions",
                        localField: '_id',
                        foreignField: 'assessmentGroupId',
                        as: "assessmentquestions"
                    }
                }]
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: assessments
    });
});

// @desc      Change assessment status to Deactivated
// @route     PUT /api/v1/assessment/deactivate/:id
// @access    Private/Admin/
exports.deactivateAssessment = asyncHandler(async(req, res, next) => {

    let assessment = await Assessment[0].findById(req.params.id);

    if (!assessment) {
        return next(new ErrorResponse(`Assessment not found with id of ${req.params.id}`, 404));
    }

    assessment = await Assessment[0].findByIdAndUpdate(req.params.id, { "assessment_status": "deactivated" }, {
        new: true,
        runValidators: false
    });

    res.status(200).json({
        success: true,
        data: assessment
    });

});

// @desc      Change exercise status to Activated
// @route     PUT /api/v1/assessment/activate/:id
// @access    Private/Admin/
exports.activateAssessment = asyncHandler(async(req, res, next) => {

    let assessment = await Assessment[0].findById(req.params.id);

    if (!assessment) {
        return next(new ErrorResponse(`Assessment not found with id of ${req.params.id}`, 404));
    }

    assessment = await Assessment[0].findByIdAndUpdate(req.params.id, { "assessment_status": "active" }, {
        new: true,
        runValidators: false
    });

    res.status(200).json({
        success: true,
        data: assessment
    });

});