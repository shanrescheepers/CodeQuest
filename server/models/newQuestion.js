const mongoose = require('mongoose');

const NewQuestion = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    screenshots: {type: Array, required: true},
    code: {type: String, required: true},
    tags: {type: String, required: true},
    upvotes: {type: Number, required: true},
    downvotes: {type: Number, required: true},
    datePosed: {type: Date, default: Date.now},
});

module.exports = mongoose.model('question', NewQuestion)