const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');

//link answer schema 
const newAnswerModel = require('../models/addAnswer');

//multer middleware, make file for screenshot image storage
const answerScreenshotStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './answerScreenshots');
      },
      filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const uploadAnswerScreenshots = multer({ storage: answerScreenshotStorage });

router.post('/api/addanswer', uploadAnswerScreenshots.array('screenshots'), (req, res, next) => {

    const data = JSON.parse(req.body.information);
    console.log(data);
    console.log(req.files);

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

    addAnswer.save()
    .then(item => {
        res.json(item)
    })
    .catch(err => {
       res.status(400).json({msg: 'There was an error posting your answer.', err}); 
    });
});

module.exports = router;
