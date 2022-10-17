const mongoose = require('mongoose');
const AnswerVoteSchema = mongoose.Schema({

    vote: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    answerId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('answerVote', AnswerVoteSchema);
