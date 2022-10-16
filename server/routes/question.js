const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');

//link question schema 
const newQuestionModel = require('../models/newQuestion');

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
       res.status(400).json({msg: 'There was an error posting your question', err}); 
    });
});

// read all questions
// the get method requires a asynchronous connection to the database
router.get('/api/readquestions', async(req, res) => {
    const findQuestions = await newQuestionModel.find();
    res.json(findQuestions);
});

module.exports = router;
