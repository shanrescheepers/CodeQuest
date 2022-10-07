//import dependencies
const express = require('express');

//link schema
const UserSchema = require('../models/user');

//user handling dependenxies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express();

//============================================================================================
//Get Current user info

router.get('/api/userInfo/:id', async (req, res) => {
    const findUser = await UserSchema.findById(req.params.id);
    res.json(findUser);
});



//============================================================================================
//Add user

router.post('/api/adduser', (req, res) => {

    console.log(req.body);
    const newUser = new UserSchema({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        yearlevel: +req.body.yearlevel,
        profileimage: req.body.profileimage,
        rank: "Bronze",
        questionsAnswered: 0,
        questionsAsked: 0


    });
    console.log("new user", newUser);

    newUser.save()
        .then(item => {
            console.log("Item log:", item);
            res.json(item)
        })
        .catch(err => {
            res.status(400).json({ msg: "Can't add user, there is an error", err });
        });
});
// get all users
router.get('/api/getUser', async (req, res) => {
    const user = await UserSchema.find();
    console.log("Get Users", user);
    res.send(user);
});

//============================================================================================
//login user
router.post('/api/loginUser', async (req, res) => {
    const findUser = await UserSchema.findOne({
        email: req.body.email,
    });
    console.log(findUser);

    let userId = findUser._id;
    if (findUser) {
        if (await bcrypt.compare(req.body.password, findUser.password)) {
            const userToken = jwt.sign({
                email: req.body.email
            }, '883Xc7F@1dkK') //this is our secret key

            return res.json({ status: "Ok", user: userToken, id: userId });


        } else {
            res.json({ user: false })
        }

    } else {
        // this message can be populated on the frontend
        res.json({ msg: "User not found" })
    }

});

// DELETE USERS
// router.post('/api/loginUser', async (req, res) => { })
//============================================================================================
//encrypt password


// DELETE USER ACCOUNT
router.delete('/api/deleteaccount/:id', async (req, res) => {
    const deleteAccount = await UserSchema.remove({ _id: req.params.id });
    res.json(deleteAccount);
});
//============================================================================================


router.post('/api/verifytoken', async (req, res) => {
    const token = req.body.token;
    // console.log(token);
    const decode = jwt.verify(token, '883Xc7F@1dkK');


    const findUser = await UserSchema.findOne({
        email: decode.email
    });

    if (findUser) {
        res.json({ status: "ok", verified: true })
    } else {
        res.json({ status: "bad", verified: false })

    }
});

module.exports = router;

