
//import dependencies
const express = require('express');
const nodemailer = require('nodemailer');

//link schema
const UserSchema = require('../models/user');

//user handling dependenxies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const image = require('../../client/src/assets/Emailer.jpg');
const router = express();

//reference the plugin for handlebars
var hbs = require('nodemailer-express-handlebars');
const path = require('path');


//============================================================================================
//Get Current user info

router.get('/api/userInfo/:id', async (req, res) => {
    const findUser = await UserSchema.findById(req.params.id);
    res.json(findUser);
});

//Get Current user info + total answers and quesions
router.get('/api/userInfo/:id', async (req, res) => {
    const findUser = await UserSchema.findById(req.params.id);
    res.json(findUser);
});


//============================================================================================
//Add user

router.post('/api/adduser', (req, res) => {


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
    // console.log("new user", newUser);

    //save new user
    newUser.save()
        .then(async item => {

            // console.log("Item log:", item);
            res.json(item);

            //verification

            const findUser = await UserSchema.findOne({
                username: req.body.username
            });

            let userIdLink = "http://localhost:3000/auth?id=" + findUser._id;
            // console.log("link is ", findUser._id);


            //Mailer functionality

            const transporter = nodemailer.createTransport({
                host: "thehandler.aserv.co.za",
                port: 465,
                secure: true,
                auth: {
                    user: "mikethemage@codequest.co.za",
                    pass: "@~buhejH0fB!"
                }
            });

            const handlebarOptions = {
                viewEngine: {
                    extName: ".handlebars",
                    partialsDir: path.resolve('./mailers'),
                    defaultLayout: false,
                },
                viewPath: path.resolve('./mailers'),
                extName: ".handlebars",
            };

            transporter.use('compile', hbs(handlebarOptions));

            const mailOptions = {
                from: '"Mike the Mage" <mikethemage@codequest.co.za>',
                to: req.body.email,
                subject: 'Welcome from CodeQuest!',
                template: 'verficationEmail',
                context: {
                    username: req.body.username,
                    email: req.body.email,
                    link: userIdLink
                },
                attachments: [{
                    filename: 'Emailer.jpg',
                    path: '../server/assets/Emailer.jpg',
                    cid: 'catImg' //same cid value as in the html img src
                },
                {
                    filename: 'logo2.jpg',
                    path: '../server/assets/logo2.jpg',
                    cid: 'logo' //same cid value as in the html img src
                },
                {
                    filename: 'otherLogo.png',
                    path: '../server/assets/otherLogo.png',
                    cid: 'otherLogo' //same cid value as in the html img src
                },
                {
                    filename: 'socialMedia.png',
                    path: '../server/assets/socialMedia.png',
                    cid: 'socials' //same cid value as in the html img src
                }
                ]
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
                // console.log("massage sent: ", info.messageId);
            });


        })
        .catch(err => {
            res.status(400).json({ msg: "There is an error", err });
        });
});


//=================================================================
//Get users

router.get('/api/getUser', async (req, res) => {
    const user = await UserSchema.find();
    // console.log("Get Users", user);
    res.send(user);
});



//============================================================================================
//login user

router.post('/api/loginUser', async (req, res) => {


    const findUser = await UserSchema.findOne({
        email: req.body.email,
    });
    // console.log(findUser);


    if (findUser) {
        if (findUser.accountStatus) {
            if (await bcrypt.compare(req.body.password, findUser.password)) {

                const userToken = jwt.sign({
                    email: req.body.email
                }, '883Xc7F@1dkK') //this is our secret key

                return res.json({ status: "Ok", user: userToken, id: findUser._id });

            } else {
                res.send("Password does not match username");
            }
        } else {
            res.send("Your Account has not been verified");
        }
    } else {
        res.send("No user found");
    };


});


//==========================================================================================
//verification

router.patch('/api/validate/:id', async (req, res) => {
    let userId = req.params.id;

    const findUser = await UserSchema.findOne({
        _id: userId
    });

    if (findUser) {
        try {
            const tokenDecrypt = jwt.verify(findUser.token, process.env.ACCESS_TOKEN_SECRET);
            const authUser = await UserSchema.findOne({
                _id: userId,
                email: tokenDecrypt.email
            });

            if (authUser) {
                const updateAccountStatus = await UserSchema.updateOne(
                    { _id: req.params.id },
                    { $set: { accountStatus: true } }
                );
                res.json({ success: true, msg: "This profile is valid", user: authUser.username })
            } else {
                res.json({ success: false, msg: "This profile is not valid" })
            }
        } catch (error) {
            res.json({ success: false, msg: "Invalid Token" });
        }
    } else {
        res.json({ success: false, msg: "Verification failed: Please contact support" })
    }
});



//============================================================================================
//encrypt password

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

// DELETE USERS
// DELETE ONE USER
router.delete("/api/deleteUser/:id", async (req, res) => {

    // console.log("User Deleted");
    // console.log(req.params);

    await UserSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});


//============================================================================================
// DELETE USER ACCOUNT
router.delete('/api/deleteaccount/:id', async (req, res) => {
    const deleteAccount = await UserSchema.remove({ _id: req.params.id });
    res.json(deleteAccount);
});



//============================================================================================
//password reset
router.post('/api/resetpass', async (req, res) => {

    console.log(req.body);
    const findUser = await UserSchema.findOne({
        email: req.body.email
    });

    if (findUser) {

        let userIdLink = 'http://localhost:3000/PassReset?id=' + findUser._id;


        //Mailer functionality

        const transporter = nodemailer.createTransport({
            host: "thehandler.aserv.co.za",
            port: 465,
            secure: true,
            auth: {
                user: "mikethemage@codequest.co.za",
                pass: "@~buhejH0fB!"
            }
        });

        const handlebarOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve('./mailers'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./mailers'),
            extName: ".handlebars",
        };

        transporter.use('compile', hbs(handlebarOptions));

        const mailOptions = {
            from: '"Mike the Mage" <mikethemage@codequest.co.za>',
            to: req.body.email,
            subject: 'Password Reset',
            template: 'passwordReset',
            context: {
                username: findUser.username,
                email: req.body.email,
                link: userIdLink
            },
            attachments: [{
                filename: 'reset.png',
                path: '../server/assets/reset.png',
                cid: 'reset' //same cid value as in the html img src
            },
            {
                filename: 'logo2.jpg',
                path: '../server/assets/logo2.jpg',
                cid: 'logo' //same cid value as in the html img src
            },
            {
                filename: 'otherLogo.png',
                path: '../server/assets/otherLogo.png',
                cid: 'otherLogo' //same cid value as in the html img src
            },
            {
                filename: 'socialMedia.png',
                path: '../server/assets/socialMedia.png',
                cid: 'socials' //same cid value as in the html img src
            }
            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            console.log("message sent: ", info.messageId);
            res.json({ success: true, msg: "Message Sent" })
        });

    } else {
        res.json({ success: false, msg: "Could not locate user on Database" })
    }

});

//update password

router.patch('/api/updatepass/:id', async (req, res) => {
    let userId = req.params.id;


    console.log(req.params.id);
    console.log(userId);

    const findUser = await UserSchema.findOne({
        _id: userId
    });

    if (findUser) {

        try {
            const tokenDecrypt = jwt.verify(findUser.token, process.env.ACCESS_TOKEN_SECRET);

            const authUser = await UserSchema.findOne({
                _id: userId,
                username: tokenDecrypt.username,
                email: tokenDecrypt.email
            });

            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(req.body.password, salt);

            if (authUser) {

                const updatePassword = await UserSchema.updateOne(
                    { _id: req.params.id },
                    { $set: { password: hashPass } }
                );

                res.json({ user: authUser.username, success: true, msg: "Password Updated" })

            } else {
                res.json({ success: false, msg: "Invalid user on database" })
            }


        } catch (error) {
            res.json({ success: false, msg: "Invalid token" })
        }

    } else {
        res.json({ success: false, msg: "Verification failed, please contact system admin" })
    }
})

//============================================================================================
router.patch('/api/updateUser', async (req, res) => {
        console.log(req.body);

        const findUser = await UserSchema.updateOne(
            {_id:req.body.userId},
            {$set: { 
                username: req.body.username,
                profileimage: req.body.profileImg,
  
                }
            }
        );
        res.json(findUser);


});


module.exports = router;