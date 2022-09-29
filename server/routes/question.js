const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');

//link question schema 
const newQuestionModel = require('../models/newQuestion');

//multer middleware, make file for screenshot image storage
const questionScreenshotStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../questionScreenshots');
      },
      filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '_' + path.extname(file.originalname));
    }
})

const uploadQuestionScreenshots = multer({ questionScreenshotStorage });

//add new question to database
router.post('/api/newquestion', uploadQuestionScreenshots.single('image'), (req, res) => {

    let data = JSON.parse(req.body.information);
    console.log(data);
    console.log(req.file);

    const newQuestion = new newQuestionModel({
        userId: data.userId,
        title: data.title,
        description: data.description,
        code: data.code,
        tags: data.tags,
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        datePosted: data.datePosed,
        image: req.file,
    });

    newQuestion.save()
    .then(item => {
        res.json(item)
    })
    .catch(err => {
       res.status(400).json({msg: 'There was an error posting your question', err}); 
    });
});

module.exports = router;
