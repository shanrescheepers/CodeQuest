// EXAMPLE
const mongoose = require('mongoose');
const VotesSchema = mongoose.Schema({
    vote: {
        type: Number,
        required: true
    },

    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
});
// upvote = 1. downvote = 0.
const Votes = mongoose.model("Votes", VotesSchema);
module.exports = { User };