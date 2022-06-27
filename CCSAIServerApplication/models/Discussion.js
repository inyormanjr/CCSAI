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

});

module.exports = mongoose.model('Discussion', DiscussionSchema);