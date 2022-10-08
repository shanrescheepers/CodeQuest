
const mongoose = require('mongoose');
const ReportedUser = mongoose.Schema({


    reportingUserId: {
        type: String,
        required: true
    },
    reportedUserId: {
        type: String,
        required: true
    },
    flagReason: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    dateFlagged: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("ReportedUser", ReportedUser);
// user can get reported multiple times, I also want to track who reported the user, and why.
