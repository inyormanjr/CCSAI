const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    discussion: {
        type: String,
        required: true
    },
    moduleId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Module',
        required: true
    },
    discussion_status : { type: String, required: true , default : "active" },
});

module.exports = mongoose.model('Discussion', DiscussionSchema);