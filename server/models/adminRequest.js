const mongoose = require('mongoose');

const adminReq = mongoose.Schema({
    userId: {type: String, required: true},
    userEmail: {type: String, required: true},
    reliability: {type: Number, required: true},
    requestStatus: {type: Boolean, required: true},
});

module.exports = mongoose.model('AdminReq', adminReq);