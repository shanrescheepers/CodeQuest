// EXAMPLE
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    yearlevel: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true,
    },
    questionsAnswered: {
        type: Number,
        required: true,
    },
    questionsAsked: {
        type: Number,
        required: true,
    },
    profileimage: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };