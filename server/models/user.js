
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    yearlevel: {
        type: Number,
        required: true
    },
    rank: {
        type: String
    },
    questionsAnswered: {
        type: Number
    },
    questionsAsked: {
        type: Number
    },
    profileimage: {
        type: String
    },
    accountStatus: { 
        type: Boolean,
        default: false
    },
    token: { 
        type: String
    }
});

UserSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;

          //create JWT
          let tokenPayload = {
            username: this.username, 
            email: this.email
        }

          const token = await jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET);
  
          this.token = token;
        next();
        
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model("User", UserSchema);