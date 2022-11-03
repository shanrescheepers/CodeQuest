const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');

//link question schema 
const newQuestionModel = require('../models/newQuestion');
const VoteSchema = require('../models/votes');
const newAnswerModel = require('../models/addAnswer');
const UserSchema = require('../models/user');

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

router.post('/api/newquestion', uploadQuestionScreenshots.array('screenshots'), async (req, res, next) => {

    const data = JSON.parse(req.body.information);


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

    const findUser= await UserSchema.findById(data.userId);
    // console.log("This is user:", findUser);
    // console.log("asked:", findUser.questionsAsked);

    let CurrentAsked = findUser.questionsAsked;

    const updateQuestionsAsked = await UserSchema.updateOne(
        { _id: data.userId },
        {
            $set: {
                questionsAsked: CurrentAsked +1,
            }
        }
    );

    newQuestion.save()
        .then(item => {
            res.json([item, updateQuestionsAsked])
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

// read questions by tag
router.get('/api/questiontag/:tag', async (req, res) => {
    const findQuestions = await newQuestionModel.find();
    let filteredTags = [];
    for (let i = 0; i < findQuestions.length; i++) {

        const element = findQuestions[i];
        let tagparameter = element.tags
        let dataTrue = false
        for (let s = 0; s < tagparameter.length; s++) {
            console.log(tagparameter[s])
            // params
            let tag = req.params.tag.toLowerCase()
            console.log(tag)
            tagparameter = tagparameter[s].toLowerCase().includes(tag)
            console.log(tagparameter)

            if (tagparameter) {
                dataTrue = true
            }
        }
        if (dataTrue) {
            filteredTags.push(element)
        }



    }
    res.json(filteredTags);
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

    console.log(req.body);
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



router.delete('/api/deletequestion/:id', async (req, res) => {

    const findQuestion= await newQuestionModel.findById(req.params.id);
    console.log("find q:", findQuestion);

    const question = await newQuestionModel.remove({ _id: req.params.id });
 

    const findUser= await UserSchema.findById(findQuestion.userId);
    console.log("This is user:", findUser);
    console.log("asked:", findUser.questionsAsked);

    let CurrentAsked = findUser.questionsAsked;

    const updateQuestionsAsked = await UserSchema.updateOne(
        { _id: findQuestion.userId },
        {
            $set: {
                questionsAsked: CurrentAsked -1,
            }
        }
    );


    res.json([question, updateQuestionsAsked]);

});



router.get('/api/search/:search', async (req, res) => {
    const question = await newQuestionModel.find();
    const answers = await newAnswerModel.find();

    console.log(req.params.search)
    search = req.params.search
    // forloop om eers deur die questions array te gaan. El = Element
    let results = []
    for (let i = 0; i < question.length; i++) {
        const el = question[i];
        title = el.title.toLowerCase();
        code = el.code
        desc = el.description.toLowerCase();
        if (title.includes(search) || desc.includes(search) || code?.includes(search)) {
            results.push(el)
        }
    }

    for (let i = 0; i < answers.length; i++) {
        const el = answers[i];
        code = el.code
        desc = el.description.toLowerCase();
        if (code?.includes(search) || desc.includes(search)) {
            el._id = el.questionId
            results.push(el)
        }
    }

    res.json(results);
});

//  2a3d441eff64c6a46179f8331c1efb553bcda87c
module.exports = router;