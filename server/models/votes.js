const mongoose = require('mongoose');

const VoteSchema = mongoose.Schema({
    vote: { type: Number, required: true },
    userId: { type: String, required: true },
    questionId: { type: String, required: true }
});

module.exports = mongoose.model('vote', VoteSchema);
