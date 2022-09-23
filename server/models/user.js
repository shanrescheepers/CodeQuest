
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
        type: String,
        // required: true,
    },
    questionsAnswered: {
        type: Number,
        // required: true,
    },
    questionsAsked: {
        type: Number,
        // required: true,
    },
    profileimage: {
        type: String,
        // required: true
    }
});

UserSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;
        next();
        
    } catch (error) {
        next(error);
    }
});


// const User = mongoose.model("User", UserSchema);
// module.exports = { User };
module.exports = mongoose.model("User", UserSchema);