const mongoose = require('mongoose');

const AnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Anouncement title is required']
    },
    description: {
        type: String,
        required: [true, 'Anouncement description is required.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }

});

module.exports = mongoose.model('Anouncement', AnouncementSchema);