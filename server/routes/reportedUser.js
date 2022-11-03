// ReportedUser
const express = require('express');
const router = express();
const ReportedUser = require('../models/reportedUser');
const UserSchema = require('../models/user');
const newAnswerModel = require('../models/addAnswer');
const newQuestionModel = require('../models/newQuestion');


// CRUD GET
router.get('/api/reportedUser/:id', async (req, res) => {
    const findUser = await ReportedUser.findById(req.params.id);
    res.json(findUser);
});

// CRUD GET
router.get('/api/reportedQuestionAnswer/:id', async (req, res) => {
    // const findUser = await ReportedUser.findById(req.params.id);
    const finduser = await ReportedUser.find({
        questionId: req.params.id,
    });

    let reportedState = false
    let totalAnswers = []

    for (let i = 0; i < finduser.length; i++) {

        const findQuestions = await newAnswerModel.find({
            questionId: finduser[i].questionId
        });
        let pair = { answerLength: findQuestions.length }
        totalAnswers.push(pair);

    }
    // console.log(finduser);
    res.json({ finduser, totalAnswers });
});

// CRUD GET Flagged / Reported Question
router.get('/api/reportedQuestions/', async (req, res) => {
    let reportedUsers = await ReportedUser.find();
    let questions = []
    for (let i = 0; i < reportedUsers.length; i++) {
        // console.log(reportedUsers[i].questionId);
        const findQuestion = await newQuestionModel.findById(reportedUsers[i].questionId);
        // console.log(findQuestion);
        if (findQuestion !== null) {
            questions.push(findQuestion)
        }
    }
    res.json(questions);
});

// CRUD GET Flagged / Reported Answers
router.get('/api/reportedAnswer/', async (req, res) => {
    let reportedUsers = await ReportedUser.find();
    let answers = []
    let questions = []

    for (let i = 0; i < reportedUsers.length; i++) {
        // console.log(reportedUsers[i].questionId);
        const findAnswer = await newAnswerModel.findById(reportedUsers[i].questionId);
        // console.log(findAnswer);
        if (findAnswer !== null) {
            answers.push(findAnswer)
            const findQuestion = await newQuestionModel.findById(findAnswer.questionId);
            // console.log(findQuestion);
            if (findQuestion !== null) {
                questions.push(findQuestion)
            }
        }


    }

    res.json({ answers, questions });
});

// CRUD GET reported Post
router.get('/api/reportedPost/:id/:userId', async (req, res) => {
    const reportedPost = await ReportedUser.find();
    // pull to do the flag icon state on question card
    let reportedState = false


    for (let i = 0; i < reportedPost.length; i++) {
        if (reportedPost[i].reportingUserId === req.params.userId) {
            if (reportedPost[i].questionId === req.params.id) {
                reportedState = true
            }
        }

    }
    // console.log(req.params.id);
    res.json(reportedState);
});

// GET ALL 
router.get('/api/allReportedUsers', async (req, res) => {
    let reportedUsers = await ReportedUser.find();
    let newReported = []


    for (let i = 0; i < reportedUsers.length; i++) {
        const findUser = await UserSchema.findById(reportedUsers[i].reportingUserId);
        const findQuestions = await newAnswerModel.find({
            questionId: reportedUsers[i].questionId
        });

        if(findUser.email != null){
            let pair = { reportingUsername: findUser.email, answerLenght: findQuestions.length }
            newReported.push(pair);
        }

        
    }


    // concat die dinge hier
    res.json({ reportedUsers, newReported });
});

// DELETE ONE : this needs some thinking because a user can get flagged by many other users
// Remove From List Function on Admin Page
router.delete('/api/deleteReportedUser/:id', async (req, res) => {
    // console.log("Deleted the user on flagged");
    // console.log(req.params);
    await ReportedUser.deleteMany({ reportedUserId: req.params.id })
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});

router.delete('/api/ignoreReportedAnswer/:id', async (req, res) => {
    // console.log("Deleted the user on flagged");
    // console.log(req.params);
    await ReportedUser.deleteOne({ questionId: req.params.id })
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});

router.delete('/api/ignoreReportedPost/:id', async (req, res) => {
    // console.log("Deleted the user on flagged");
    // console.log(req.params);
    await ReportedUser.deleteOne({ questionId: req.params.id })
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});

// To Report A User, One must First , ADD a User (to report, obviouslay ay ay).
router.post('/api/addReportedUser', (req, res) => {
    // console.log(req.body);
    const newReportedUser = new ReportedUser({
        reportingUserId: req.body.reportingUserId,
        reportedUserId: req.body.reportedUserId,
        flagReason: req.body.flagReason,
        questionId: req.body.questionId,
        // dateflagged doesn't get passed through
    });
    // console.log("New Reported User (in violation of CodeQuest ethichs and principles)", newReportedUser);

    newReportedUser.save()
        .then(item => {
            // console.log("Succesfully Added a New Reported User from CodeQuest. Username: ", item);
            res.json(item)
        })
        .catch(err => {
            res.status(400).json({ msg: "Cannot add the new Reported User because: ", err });
        });
});

router.delete('/api/deleteAnswer/:id', async (req, res) => {
    // console.log(req.params.id);
    await newAnswerModel.deleteOne({ _id: req.params.id })
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});

//This would delete the post and answers
router.delete('/api/deletePost/:id', async (req, res) => {
    // console.log(req.params.id);
    await newQuestionModel.deleteOne({ _id: req.params.id })
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});

module.exports = router;

