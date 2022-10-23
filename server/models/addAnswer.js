const mongoose = require('mongoose');

const addAnswer = mongoose.Schema({
    userId: {type: String, required: true},
    questionId: {type: String, required: true},
    description: {type: String, required: true},
    screenshots: {type: Array, required: false},
    code: {type: String, required: false},
    upvotes: {type: Number, required: true},
    downvotes: {type: Number, required: true},
    datePosted: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Answer', addAnswer);