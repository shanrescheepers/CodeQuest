const mongoose = require('mongoose');
const VoteSchema = mongoose.Schema({

    vote: {
        type: String, //input will be upvote or downvote
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('vote', VoteSchema);
