const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// const userRoute = require('./routes/user');
const userRoute = require('./routes/user');
const questionRoute = require('./routes/question');

const reportedUserRoute = require('./routes/reportedUser');

const answerRoute = require('./routes/answer')
const adminRoute = require('./routes/admin')
const awardRoute = require('./routes/awardRoute')
const userBioRoute = require('./routes/userBio');

require('dotenv/config');

const app = express();
// connect hier met ander localhost
app.use(cors({
    origin: 'http://localhost:3000'
}));

//question screenshot storage path
app.use('/questionScreenshots', express.static('questionScreenshots'));

//answer screenshot storage path
app.use('/answerScreenshots', express.static('answerScreenshots'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(reportedUserRoute)
app.use(questionRoute);
app.use(userRoute);
app.use(answerRoute);
app.use(adminRoute);
app.use(awardRoute);
app.use(userBioRoute);



mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'CodeQuest',
}).then(() => console.log("Connected to CodeQuest DB"))
    .catch((err) => {
        console.log("No Connection. Reason: " + err);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`) });