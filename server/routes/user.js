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

//set express view engine
// const app = express();
// app.set("view engine", "ejs");


//============================================================================================
//Get Current user info

router.get('/api/userInfo/:id', async (req, res) =>{
    const findUser = await UserSchema.findById(req.params.id);
    res.json(findUser);
});



//============================================================================================
//Add user

router.post('/api/adduser', (req, res) =>{

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




//=====================================================s======================
//save new user
    newUser.save()
    .then( async item => {

        console.log("Item log:", item);
        res.json(item);

//verification

const findUser = await UserSchema.findOne({
    username: req.body.username
});

let userIdLink = "http://localhost:3000/auth?id=" + findUser._id;

//===================================================================================
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
}

transporter.sendMail(mailOptions, (error, info)=> {
    if(error){
        console.log(error);
    }
    console.log("massage sent: ", info);
})

  
    })
    .catch(err => {
       res.status(400).json({msg:"Can't add user, there is an error", err}); 
    });
});

router.get('/api/getUser', async(req, res) => {
    const user = await UserSchema.find();
    console.log("Get Users", user);
    res.send(user);
});



//============================================================================================
//login user

router.post('/api/loginUser', async (req,res) => {

  
    const findUser = await UserSchema.findOne({
        email: req.body.email,
    });
    console.log(findUser);

    if(findUser){
        if(findUser.accountStatus){
            if(await bcrypt.compare(req.body.password, findUser.password)){
                res.send("The user can login.")
            }else{
                res.send("Password does not match username");
            }
        }else{
            res.send("Your Account has not been verified");
        }
    }else{
        res.send("No user found");
    };
    

    let userId= findUser._id;
    if(findUser){
        if(await bcrypt.compare(req.body.password, findUser.password)){
            const userToken = jwt.sign({
                email: req.body.email
            }, '883Xc7F@1dkK') //this is our secret key

            return res.json({status: "Ok", user: userToken, id: userId});


        }else{
            res.json({user: false})
        }

    }else{
        res.json({msg: "User not found"})
    }

});


//==========================================================================================
//verification

router.patch('/api/validate/:id', async (req,res) => {
    let userId = req.params.id;

    const findUser = await UserSchema.findOne({
        _id: userId
    });

    if(findUser){
        try{
            const tokenDecrypt = jwt.verify(findUser.token, process.env.ACCESS_TOKEN_SECRET);
            const authUser = await UserSchema.findOne({
                _id: userId,
                eamil: tokenDecrypt.email
            });

            if(authUser){
                const updateAccountStatus = await UserSchema.updateOne(
                   {_id: req.params.id},
                   {$set: {accountStatus: true}}
                );
                res.json({success:true, msg: "This profile is valid", user: authUser.username})
            }else{
                res.json({success:false, msg: "This profile is not valid"})
            }
        }catch (error){
            res.json({success:false, msg: "Invalid Token"});
        }
    }else{
        res.json({success: false, msg: "Verification failed: Please contact support"})
    }
});



//============================================================================================
//encrypt password

router.post('/api/verifytoken', async (req,res) =>{
    const token = req.body.token;
    // console.log(token);
    const decode = jwt.verify(token, '883Xc7F@1dkK');

    
    const findUser = await UserSchema.findOne({
        email: decode.email
    });

    if(findUser){
        res.json({status: "ok", verified: true})
    }else{
        res.json({status: "bad", verified: false})

    }
});

module.exports = router;

