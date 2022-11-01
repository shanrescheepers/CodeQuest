const express = require('express');
const router = express();
const awardSchema = require('../models/awardStatus');


router.post('/api/userAwardModals', (req, res) => {

    // console.log(req.body);
    const awards = new awardSchema({
        userId: req.body.userId,
        silver: req.body.silver,
        gold: req.body.gold,
        platinum: req.body.platinum,
        diamond: req.body.diamond,
        FirstQuestionModal: req.body.FirstQuestionModal,
        SecondQuestionModal: req.body.SecondQuestionModal,
        ThirdQuestionModal: req.body.ThirdQuestionModal,
        FourthQuestionModal: req.body.FourthQuestionModal,
        FifthAnswerModal: req.body.FifthAnswerModal,
        SixthAnswerModal: req.body.SixthAnswerModal,
        SeventhAnswerModal: req.body.SeventhAnswerModal,
        EighthAnswerModal: req.body. EighthAnswerModal,
        FirstUpvoteModal: req.body.FirstUpvoteModal,
        SecondUpvoteModal: req.body.SecondUpvoteModal,
        ThirdUpvoteModal: req.body.ThirdUpvoteModal,
        FourthUpvoteModal: req.body.FourthUpvoteModal,
        FifthUpvoteModal: req.body.FifthUpvoteModal,
        SixthUpvoteModal: req.body.SixthUpvoteModal,
        SeventhUpvoteModal: req.body.SeventhUpvoteModal,
        EighthUpvoteModal: req.body.EighthUpvoteModal,
        SilverRankModal: req.body.SilverRankModal,
        GoldRankModal: req.body.GoldRankModal,
        DiamondRankModal: req.body.DiamondRankModal
    });
    // console.log("new user", newUser);

    awards.save()
        .then(item => {
            // console.log("Item log:", item);
            res.json(item)
        })
        .catch(err => {
            res.status(400).json({ msg: "There is an error", err });
        });

})


// Get User Modal Status 
router.get('/api/getmodalStatus', async (req, res) => {
    const awards = await awardSchema.find();
    res.send(awards);
});



router.patch('/api/userAwardModalsUpdate/:id', async (req, res) => {

    const awards = await awardSchema.updateOne(
        { _id: req.params.id },
        {
            $set: {
                userId: req.body.userId,
                silver: req.body.silver,
                gold: req.body.gold,
                platinum: req.body.platinum,
                diamond: req.body.diamond,
                FirstQuestionModal: req.body.FirstQuestionModal,
                SecondQuestionModal: req.body.SecondQuestionModal,
                ThirdQuestionModal: req.body.ThirdQuestionModal,
                FourthQuestionModal: req.body.FourthQuestionModal,
                FifthAnswerModal: req.body.FifthAnswerModal,
                SixthAnswerModal: req.body.SixthAnswerModal,
                SeventhAnswerModal: req.body.SeventhAnswerModal,
                EighthAnswerModal: req.body. EighthAnswerModal,
                FirstUpvoteModal: req.body.FirstUpvoteModal,
                SecondUpvoteModal: req.body.SecondUpvoteModal,
                ThirdUpvoteModal: req.body.ThirdUpvoteModal,
                FourthUpvoteModal: req.body.FourthUpvoteModal,
                FifthUpvoteModal: req.body.FifthUpvoteModal,
                SixthUpvoteModal: req.body.SixthUpvoteModal,
                SeventhUpvoteModal: req.body.SeventhUpvoteModal,
                EighthUpvoteModal: req.body.EighthUpvoteModal,
                SilverRankModal: req.body.SilverRankModal,
                GoldRankModal: req.body.GoldRankModal,
                DiamondRankModal: req.body.DiamondRankModal
            }
        }
    );
    res.json(awards);
});


module.exports = router;