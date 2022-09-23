const mongoose = require('mongoose');

const newQuestion = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    screenshots: {type: String, required: true},
    code: {type: String, required: true},
    tags: {type: String, required: true},

});

module.exports = mongoose.model('question', newQuestion)