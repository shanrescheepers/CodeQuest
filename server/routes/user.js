//import dependencies
const express = require('express');
const session = require('express-session');
const passport = require('passport');

//link schema
const UserSchema = require('../models/user');

//user handling dependenxies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express();


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
//   router.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
  router.use(passport.initialize());
  router.use(passport.session());



  
  router.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
  ));


  router.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/FeedPage',
    failureRedirect: '/auth/google/failure'
  })
);


router.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });

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

