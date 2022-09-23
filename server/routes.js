const express = require('express');
const router = express();
const multer = require('multer');
const path = require('path');
const newQuestionModel = require('./models/newQuestion');

//create new question
router.post('/api/askquestion', uploadProductImage.single('image'), (req, res) => {

    let data = JSON.parse(req.body.information);

    const newQuestion = new newQuestionModel({

        title: {type: String, required: true},
        description: {type: String, required: true},
        screenshots: {type: String, required: true},
        code: {type: String, required: true},
        tags: {type: String, required: true},
    });

    newUser.save()
    .then(item => {
        res.json(item)
    })
    .catch(err => {
       res.status(400).json({msg:"There is an error", err}); 
    });
});