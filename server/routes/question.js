const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');

//link question schema 
const newQuestionModel = require('../models/newQuestion');
const VoteSchema = require('../models/votes');

//multer middleware, make file for screenshot image storage
const questionScreenshotStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './questionScreenshots');
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const uploadQuestionScreenshots = multer({ storage: questionScreenshotStorage });

router.post('/api/newquestion', uploadQuestionScreenshots.array('screenshots'), (req, res, next) => {

    const data = JSON.parse(req.body.information);
    // console.log(data);
    // console.log(req.files);

    const newQuestion = new newQuestionModel({
        userId: data.userId,
        title: data.title,
        description: data.description,
        code: data.code,
        tags: data.tags,
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        datePosted: data.datePosed,
        screenshots: req.files,
    });

    newQuestion.save()
        .then(item => {
            res.json(item)
        })
        .catch(err => {
            res.status(400).json({ msg: 'There was an error posting your question', err });
        });
});

// read all questions
// the get method requires a asynchronous connection to the database
router.get('/api/readquestions', async (req, res) => {
    const findQuestions = await newQuestionModel.find();
    res.json(findQuestions);
});


//========================================================================================
//Increase Upvote
router.patch('/api/updateUpvotes/:id', async (req, res) => {

    // console.log(req.body);
    // console.log("works");

    const findQuestion = await newQuestionModel.updateOne(
        { _id: req.params.id },
        {
            $set: {
                upvotes: req.body.totalUpvotes,
            }
        }
    );
    res.json(findQuestion);
});


//===============================================================================
//Add Vote
router.post('/api/addvote', async (req, res) => {

    // console.log(req.body.vote);
    const findVoteUser = await VoteSchema.find();
    //  console.log(findVoteUser);

    const questions = findVoteUser.filter(item => item.questionId == req.body.questionId); //gets questions id
    const users = questions.filter(item => item.userId == req.body.userId); //gets users qs

    if (users === 'undefined' || users.length === 0) {

        console.log("Users length:", users.length);
        const findQuestion = await newQuestionModel.findById(req.body.questionId);

        let upvote = findQuestion.upvotes;
        let downvote = findQuestion.downvotes;

        if (req.body.vote === 'upvote') {
            upvote = upvote + 1;
            voteState = "downvote"
        } else {
            downvote = downvote + 1;
            voteState = "upvote"
        };

        const updateQuestion = await newQuestionModel.updateOne(
            { _id: req.body.questionId },
            {
                $set: {
                    upvotes: upvote,
                    downvotes: downvote
                }
            }
        );
        // console.log(req.body);
        const newVote = new VoteSchema({
            vote: req.body.vote,
            userId: req.body.userId,
            questionId: req.body.questionId
        });
        // console.log("New vote code");

        newVote.save()
            .then(item => {
                // console.log(updateQuestion);
                res.json([item, updateQuestion])
            })
            .catch(err => {
                res.status(400).json({ msg: "There is an error", err });
            });

    } else {
        // console.log("User Already voted");
        //if() they are the same otherwise update
        // console.log(req.body.vote);
        if (users[0].vote === req.body.vote) {

            const findQuestion = await newQuestionModel.findById(users[0].questionId);

            let upvote = findQuestion.upvotes;
            let downvote = findQuestion.downvotes;

            if (req.body.vote === 'upvote') {
                upvote = upvote - 1;
            } else {
                downvote = downvote - 1;
            }

            const updateQuestion = await newQuestionModel.updateOne(
                { _id: users[0].questionId },
                {
                    $set: {
                        upvotes: upvote,
                        downvotes: downvote
                    }
                }
            );
            const findRepVote = await VoteSchema.deleteOne({ _id: users[0]._id });
            res.json(findRepVote);

        } else {
            const findQuestion = await newQuestionModel.findById(users[0].questionId);

            let upvote = findQuestion.upvotes;
            let downvote = findQuestion.downvotes;
            let voteState = users[0].vote;

            if (users[0].vote === 'upvote') {
                upvote = upvote - 1;
                downvote = downvote + 1;
                voteState = 'downvote';
            } else if (users[0].vote === 'downvote') {
                downvote = downvote - 1;
                upvote = upvote + 1;
                voteState = 'upvote';
            }
            // console.log(upvote);
            // console.log(downvote);

            const updateQuestion = await newQuestionModel.updateOne(
                { _id: users[0].questionId },
                {
                    $set: {
                        upvotes: upvote,
                        downvotes: downvote
                    }
                }
            );

            const updateVotes = await VoteSchema.updateOne(
                { _id: users[0]._id },
                {
                    $set: {
                        vote: voteState,
                    }
                }
            );
            // console.log("UpdateVote", updateVotes);

            res.json([updateVotes, updateQuestion]);
        }
    }

});

//===============================================================================
//Read Votes

router.get('/api/readvote', async (req, res) => {
    const findVote = await VoteSchema.find();
    res.json(findVote);
});


module.exports = router;