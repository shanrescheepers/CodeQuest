// EXAMPLE
// const express = require('express');
// const router = express();
const { User } = require('../models/user');


// router.get('/login', async (req, res) => {

//     await User.findOne({
//         email: req.body.email,
//         password: req.body.password,
//     })
//         .then(user => res.json(user))
//         .catch(error => res.status(500).json(error));
// });




//import dependencies
const express = require('express');

//link schema
const UserSchema = require('../models/user');

//user handling dependenxies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express();


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
        rank: "",
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


//============================================================================================
//login user

router.post('/api/loginUser', async (req,res) => {

    const findUser = await UserSchema.findOne({
        email: req.body.email
    });

    if(findUser){
        if(await bcrypt.compare(req.body.password, findUser.password)){
            const userToken = jwt.sign({
                email: req.body.email
            }, '883Xc7F@1dkK') //this is our secret key

            return res.json({status: "Ok", user: userToken});


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

