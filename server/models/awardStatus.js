const mongoose = require('mongoose');

const awardSchema = mongoose.Schema({
    userId: {type: String, required: true},
    silver: {type: String, required: true},
    gold: {type: String, required: true},
    platinum: {type: String, required: true},
    diamond: {type: String, required: true},
    FirstQuestionModal: {type: String, required: true},
    SecondQuestionModal: {type: String, required: true},
    ThirdQuestionModal: {type: String, required: true},
    FourthQuestionModal: {type: String, required: true},
    FifthAnswerModal: {type: String, required: true},
    SixthAnswerModal: {type: String, required: true},
    SeventhAnswerModal: {type: String, required: true},
    EighthAnswerModal: {type: String, required: true},  
    FirstUpvoteModal: {type: String, required: true},
    SecondUpvoteModal: {type: String, required: true},
    ThirdUpvoteModal: {type: String, required: true},
    FourthUpvoteModal: {type: String, required: true},
    FifthUpvoteModal: {type: String, required: true},
    SixthUpvoteModal: {type: String, required: true},
    SeventhUpvoteModal: {type: String, required: true},
    EighthUpvoteModal: {type: String, required: true},
    SilverRankModal: {type: String, required: true},
    GoldRankModal: {type: String, required: true},
    DiamondRankModal: {type: String, required: true},
    
});

module.exports = mongoose.model('awardModals', awardSchema);