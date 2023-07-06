const mongoose = require('mongoose');

/**
 * Assessment Relationship
 * 1 Assessment : M AssessmentGroup
 * 1 AssessmentGroup : M Questions
 **/

const AssessmentSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Module',
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  assessmentName: { type: String, required: true },
  assessment_status: { type: String, required: true, default: 'active' },
});

const AssessmentGroupSchema = new mongoose.Schema({
  assessmentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Assessment',
    required: true,
  },
  groupName: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString('en-US') + '-AssessmentGroup',
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const AssessmentQuestionSchema = new mongoose.Schema({
  assessmentGroupId: {
    type: mongoose.Schema.ObjectId,
    ref: 'AssessmentGroup',
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  questionDetail: {
    type: String,
    required: true,
    default: '',
  },
  instructions: {
    type: String,
    required: true,
    default: '',
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  answers: [
    {
      type: String,
    },
  ],
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);
const AssessmentGroup = mongoose.model(
  'AssessmentGroup',
  AssessmentGroupSchema
);
const AssessmentQuestion = mongoose.model(
  'AssessmentQuestion',
  AssessmentQuestionSchema
);

module.exports = {
  Assessment,
  AssessmentGroup,
  AssessmentQuestion,
};
