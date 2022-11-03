const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');

//link answer schema 
const newAnswerModel = require('../models/addAnswer');
const AnswerVoteSchema = require('../models/answerVote');
const UserSchema = require('../models/user');

//multer middleware, make file for screenshot image storage
const answerScreenshotStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './answerScreenshots');
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const uploadAnswerScreenshots = multer({ storage: answerScreenshotStorage });

router.post('/api/addanswer', uploadAnswerScreenshots.array('screenshots'), async (req, res, next) => {

    const data = JSON.parse(req.body.information);
    // console.log(data);
    // console.log(req.files);

    const addAnswer = new newAnswerModel({
        userId: data.userId,
        questionId: data.questionId,
        description: data.description,
        screenshots: req.files,
        code: data.code,
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        datePosted: data.datePosed,
    });

    const findUser= await UserSchema.findById(data.userId);
    // console.log("This is user:", findUser);
    // console.log("asked:", findUser.questionsAsked);

    let CurrentAnswered = findUser.questionsAnswered;

    const updateQuestionsAnswered = await UserSchema.updateOne(
        { _id: data.userId },
        {
            $set: {
                questionsAnswered: CurrentAnswered +1,
            }
        }
    );

    addAnswer.save()
        .then(item => {
            res.json([item, updateQuestionsAnswered])
        })
        .catch(err => {
            res.status(400).json({ msg: 'There was an error posting your answer.', err });
        });
});

router.get("/api/readAllAnswers", async (req, res) => {
    const findQuestions = await newAnswerModel.find();
    res.json(findQuestions);
});

router.get("/api/readanswer/:id", async (req, res) => {
    const findQuestions = await newAnswerModel.findById(req.params.id);
    res.json(findQuestions);
});

router.get("/api/readQuestionAnswer/:id", async (req, res) => {
    // console.log(req.params.id);
    const findQuestions = await newAnswerModel.find({
        questionId: req.params.id
    });
    res.json(findQuestions);
});

router.get("/api/readQuestionAnswerAmount/:id", async (req, res) => {
    // console.log(req.params.id);
    const findQuestions = await newAnswerModel.find({
        questionId: req.params.id
    });
    res.json(findQuestions.length);
});

//===================================================================================
//new code


//========================================================================================
//Increase Upvote
router.patch('/api/updateanswerUpvotes/:id', async (req, res) => {

    // console.log(req.body);
    // console.log("works");

    const findAnswer = await newAnswerModel.updateOne(
        { _id: req.params.id },
        {
            $set: {
                upvotes: req.body.totalUpvotes,
            }
        }
    );
    res.json(findAnswer);
});


//===============================================================================
//Add Vote
router.post('/api/addanswervote', async (req, res) => {

    console.log('body: ', req.body);
    const findVoter = await AnswerVoteSchema.find();
    console.log('find', findVoter);

    const answers = findVoter.filter(item => item.answerId == req.body.answerId); //gets questions id
    const users = answers.filter(item => item.userId == req.body.userId); //gets users qs
    console.log("answers: ", answers);
    console.log("Users: ", users);

    //  const findQuestion = await newQuestionModel.findById(users[0].questionId);

    if (users === 'undefined' || users.length === 0 || users === null) {

        // console.log("Users length:", users.length);
        console.log("This is doing something");
        console.log(req.body.answerId);
        console.log(req.body);
        const findAnswer = await newAnswerModel.findById(req.body.answerId);

        //****** ATTENTION ******
        //PLEASE DO NOT REMOVE! OR ELSE IT WILL BREAK! - Shanre
        console.log('FindAnswer', findAnswer);
        //****** ATTENTION ******
       
        let upvote = findAnswer.upvotes;
        let downvote = findAnswer.downvotes;


        if (req.body.vote === 'upvote') {
            upvote = upvote + 1;
            voteState = "downvote"
        } else {
            downvote = downvote + 1;
            voteState = "upvote"
        };

        const updateAnswer = await newAnswerModel.updateOne(
            { _id: req.body.answerId },
            {
                $set: {
                    upvotes: upvote,
                    downvotes: downvote
                }
            }
        );
        // console.log(req.body);
        const newVote = new AnswerVoteSchema({
            vote: req.body.vote,
            userId: req.body.userId,
            answerId: req.body.answerId
        });
        // console.log("New vote code", newVote);

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

            const findAnswer = await newAnswerModel.findById(users[0].answerId);
            // console.log("rep", findAnswer);
            let upvote = findAnswer.upvotes;
            let downvote = findAnswer.downvotes;

            if (req.body.vote === 'upvote') {
                upvote = upvote - 1;
            } else {
                downvote = downvote - 1;
            }

            const updateAnswer = await newAnswerModel.updateOne(
                { _id: users[0].answerId },
                {
                    $set: {
                        upvotes: upvote,
                        downvotes: downvote
                    }
                }
            );
            const findRepVote = await AnswerVoteSchema.deleteOne({ _id: users[0]._id });
            res.json(findRepVote);

        } else {
            const findAnswer = await newAnswerModel.findById(users[0].answerId);

            // console.log(findQuestion);
            let upvote = findAnswer.upvotes;
            let downvote = findAnswer.downvotes;
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

            const updateQuestion = await newAnswerModel.updateOne(
                { _id: users[0].answerId },
                {
                    $set: {
                        upvotes: upvote,
                        downvotes: downvote
                    }
                }
            );

            const updateVotes = await AnswerVoteSchema.updateOne(
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

router.get('/api/readanswervote', async (req, res) => {
    const findVote = await AnswerVoteSchema.find();
    res.json(findVote);
});



router.delete('/api/deleteansweronprofile/:id', async (req, res) => {

    const findAnswer= await newAnswerModel.findById(req.params.id);
    console.log("find a:", findAnswer);
    if(findAnswer){

        const findUser= await UserSchema.findById(findAnswer.userId);
        console.log("This is user:", findUser);
        console.log("Curerent answered:", findUser.questionsAnswered);

        if(findUser){
            let CurrentAnswered= findUser.questionsAnswered;
            const updateQuestionsAnswered = await UserSchema.updateOne(
                { _id: findAnswer.userId },
                {
                    $set: {
                        questionsAnswered: CurrentAnswered -1,
                    }
                }
            );


            const answer = await newAnswerModel.remove({ _id: req.params.id }); 
            res.json([answer, updateQuestionsAnswered]);
        
        }

    }


});


module.exports = router;
