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

//===================================================================================
//Mailer functionality

// const mailerOutput = `
//     <html > 
//     <body style="color: #2b2b2b;font-family: 'Open Sans';background-color: #EBEBF5; padding: 50px;text-align: center;">
//         <div class="circle" style="width: 100%;height: 250px;background-color: #2b2b2b;color: #f1f1f1;text-align: center;padding: 20px;">
//             <h4 style="margin-top: 25px;font-weight: 300;margin-bottom: 0px;">Hey ${req.body.username}!</h4>
//             <h2 style="margin-top: 5px;">Welcome to CodeQuest!</h2>
//             <p style="width: 300px;margin: 0 auto;margin-bottom: 40px;">Are you ready to embark on the quest for code? Join us and help yourself and others become better coders along this journey as developers!</p>

//             <a class="button" style="padding: 13px;background-color: #FF7900;border-radius: 30px;color: #ffffff;padding-left: 25px;padding-right: 25px;">Verify Account</a>
//       </div>  
//       <img src="cid:unique@kreata.ee" style="width: 450px;position: absolute;margin-top: -285px;margin-left: -60px">

       
   
//     <footer style="height: 60px; background-color: #EBEBF5;width: 100%;text-align: center;background-color: #2b2b2b;color: #ffffff;padding-top: 5px;padding-bottom: 5px;bottom: 0;margin-top:20px;">
//         <h3>Your Journey Awaits.</h3>
//     </footer>
//     </body>
// </html>`;

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
      username: req.body.username
    }
    // text: 'Generic',
    // html: mailerOutput,
    // attachments: [{
    //     filename: 'Emailer.jpg',
    //     path: '../server/assets/Emailer.jpg',
    //     cid: 'unique@kreata.ee' //same cid value as in the html img src
    // }
// ]
}

transporter.sendMail(mailOptions, (error, info)=> {
    if(error){
        console.log(error);
    }
    console.log("massage sent: ", info);
})




//=====================================================s======================
//save new user
    newUser.save()
    .then(item => {
        console.log("Item log:", item);
        res.json(item)
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

