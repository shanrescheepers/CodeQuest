// EXAMPLE
const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    questionTitle: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },

    tags: {

    },

    postQuestion: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },
    codeImg: {

    },
    codeInputField: {
        type: String,
        required: true
    }
    // postId: {
    //     type: String,
    //     required: true
    // }
});
// upvote = 1. downvote = 0.
const Post = mongoose.model("Post", PostSchema);
module.exports = { User };