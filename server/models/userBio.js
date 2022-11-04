const mongoose = require('mongoose');

const userBioSchema = mongoose.Schema({
    userBioId: {type: String, required: true},
    description: {type: String, required: true},
});

module.exports = mongoose.model('Bio', userBioSchema);