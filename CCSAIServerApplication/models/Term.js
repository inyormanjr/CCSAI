const mongoose = require('mongoose');

const TermSchema = new mongoose.Schema({
    termName: {
        type: String,
        required: [true, "Please input term"],
        unique: true
    },
});

module.exports = mongoose.model('Term', TermSchema);