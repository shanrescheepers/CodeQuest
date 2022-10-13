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
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const uploadQuestionScreenshots = multer({ storage: questionScreenshotStorage });

router.post('/api/newquestion', uploadQuestionScreenshots.array('screenshots'), (req, res, next) => {

    const data = JSON.parse(req.body.information);
    console.log(data);
    console.log(req.files);

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
       res.status(400).json({msg: 'There was an error posting your question', err}); 
    });
});

// read all questions
// the get method requires a asynchronous connection to the database
router.get('/api/readquestions', async(req, res) => {
    const findQuestions = await newQuestionModel.find();
    res.json(findQuestions);
});


//========================================================================================
//Increase Upvote
router.patch('/api/updateUpvotes/:id', async(req, res) => {

    // console.log(req.body);
    // console.log("works");

 const findQuestion = await newQuestionModel.updateOne(
        {_id:req.params.id},
        {$set: { 
           upvotes: req.body.totalUpvotes,
            }
        }
    );
    res.json(findQuestion);
});


//===============================================================================
//Add Vote
router.post('/api/addvote',async (req, res) =>{

    console.log(req.body.vote);
     const findVoteUser = await VoteSchema.find();
    //  console.log(findVoteUser);

     const questions = findVoteUser.filter(item => item.questionId == req.body.questionId); //gets questions id
     const users = questions.filter(item => item.userId == req.body.userId); //gets questions id
     console.log("Questions: ",questions);
     console.log("Users: ",users);
     if(users.length === 0){
                    // console.log(req.body);
            const newVote = new VoteSchema({
                vote: req.body.vote, 
                userId: req.body.userId,
                questionId: req.body.questionId
            }); 
            // console.log(newVote);

            newVote.save()
            .then(item => {
                res.json(item)
            })
            .catch(err => {
            res.status(400).json({msg:"There is an error", err}); 
            });

     }else{
        console.log("User Already voted");
        //if() they are the same otherwise update
        console.log(users[0]._id);

        if(users[0].vote === req.body.vote){
            console.log("delete");
        }else{

            let upvote = 0;
            let downvote = 0;

            const findQuestion = await newQuestionModel.findById(users[0].questionId);

            if(users[0].vote === 'upvote'){
                upvote = findQuestion.upvote +1;
                downvote = findQuestion.downvote -1;

            }else{
                upvote = findQuestion.upvote -1;
                downvote = findQuestion.downvote +1;
            }
            
            const updateQuestion = await newQuestionModel.updateOne(
                {_id:users[0].questionId},
                {$set: { 
                   upvotes: upvote,
                   downvotes: downvote
                    }
                }
            );
            res.json(updateQuestion);
        }
        res.json("Vote Update");
     }





});



module.exports = router;
